import lodash from "lodash";
import type { CodeGenConfig } from "../configuration.js";
import { SCHEMA_TYPES } from "../constants.js";
import type { SchemaComponentsMap } from "../schema-components-map.js";
import type { SchemaWalker } from "../schema-walker.js";
import type { TypeNameFormatter } from "../type-name-formatter.js";
import { internalCase } from "../util/internal-case.js";
import { pascalCase } from "../util/pascal-case.js";

export class SchemaUtils {
  config: CodeGenConfig;
  schemaComponentsMap: SchemaComponentsMap;
  typeNameFormatter: TypeNameFormatter;
  schemaWalker: SchemaWalker;

  constructor({
    config,
    schemaComponentsMap,
    typeNameFormatter,
    schemaWalker,
  }) {
    this.config = config;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeNameFormatter = typeNameFormatter;
    this.schemaWalker = schemaWalker;
  }

  getRequiredProperties = (schema) => {
    return lodash.uniq(
      (schema && Array.isArray(schema.required) && schema.required) || [],
    );
  };

  isRefSchema = (schema) => {
    return !!schema?.$ref;
  };

  getEnumNames = (schema) => {
    return (
      schema["x-enumNames"] ||
      schema.xEnumNames ||
      schema["x-enumnames"] ||
      schema["x-enum-varnames"]
    );
  };

  getEnumDescriptions = (schema) => {
    return (
      schema["x-enumDescriptions"] ||
      schema.xEnumDescriptions ||
      schema["x-enumdescriptions"] ||
      schema["x-enum-descriptions"]
    );
  };

  getSchemaPropertyNamesSchema = (schema) => {
    if (!schema) return null;
    return schema.propertyNames || schema["x-propertyNames"] || null;
  };

  getSchemaRefType = (schema) => {
    if (!this.isRefSchema(schema)) return null;
    return this.schemaComponentsMap.get(schema.$ref);
  };

  isPropertyRequired = (name, propertySchema, rootSchema) => {
    if (propertySchema["x-omitempty"] === false) {
      return true;
    }

    const isRequired =
      typeof propertySchema.required === "boolean"
        ? !!propertySchema.required
        : Array.isArray(rootSchema.required)
          ? rootSchema.required.includes(name)
          : !!rootSchema.required;

    if (this.config.convertedFromSwagger2) {
      return typeof propertySchema.nullable === this.config.Ts.Keyword.Undefined
        ? isRequired
        : !propertySchema.nullable;
    }
    return isRequired;
  };

  isNullMissingInType = (schema, type) => {
    const { nullable, type: schemaType } = schema || {};
    return (
      (nullable ||
        !!lodash.get(schema, "x-nullable") ||
        schemaType === this.config.Ts.Keyword.Null) &&
      typeof type === "string" &&
      !type.includes(` ${this.config.Ts.Keyword.Null}`) &&
      !type.includes(`${this.config.Ts.Keyword.Null} `)
    );
  };

  safeAddNullToType = (schema, type) => {
    if (this.isNullMissingInType(schema, type)) {
      return this.config.Ts.UnionType([type, this.config.Ts.Keyword.Null]);
    }
    return type;
  };

  getSchemaPrimitiveType = (rawSchema) => {
    const schema = rawSchema || {};

    if (schema.type) {
      return internalCase(schema.type);
    }
    if (schema.enum) {
      const enumFieldType = typeof schema.enum[0];
      if (enumFieldType === this.config.Ts.Keyword.Undefined) return;

      return internalCase(enumFieldType);
    }
    if (lodash.keys(schema.properties).length) {
      return SCHEMA_TYPES.OBJECT;
    }
    if (schema.items) {
      return SCHEMA_TYPES.ARRAY;
    }

    return null;
  };

  checkAndAddRequiredKeys = (schema, resultType) => {
    if ("$$requiredKeys" in schema && schema.$$requiredKeys.length) {
      this.config.update({
        internalTemplateOptions: {
          addUtilRequiredKeysType: true,
        },
      });
      return this.config.Ts.TypeWithGeneric(
        this.config.Ts.CodeGenKeyword.UtilRequiredKeys,
        [
          resultType,
          this.config.Ts.UnionType(
            schema.$$requiredKeys.map(this.config.Ts.StringValue),
          ),
        ],
      );
    }

    return resultType;
  };

  makeAddRequiredToChildSchema = (parentSchema, childSchema) => {
    if (!childSchema) return childSchema;

    const required = lodash.uniq([
      ...this.getRequiredProperties(parentSchema),
      ...this.getRequiredProperties(childSchema),
    ]);

    const refData = this.getSchemaRefType(childSchema);

    if (refData) {
      const refObjectProperties = lodash.keys(
        refData.rawTypeData?.properties || {},
      );
      const existedRequiredKeys = refObjectProperties.filter((key) =>
        required.includes(key),
      );

      if (!existedRequiredKeys.length) return childSchema;

      return {
        ...childSchema,
        $$requiredKeys: existedRequiredKeys,
      };
    }

    if (childSchema.properties) {
      const childSchemaProperties = lodash.keys(childSchema.properties);
      const existedRequiredKeys = childSchemaProperties.filter((key) =>
        required.includes(key),
      );

      if (!existedRequiredKeys.length) return childSchema;

      return {
        required: lodash.uniq([
          ...this.getRequiredProperties(childSchema),
          ...existedRequiredKeys,
        ]),
        ...childSchema,
      };
    }

    return childSchema;
  };

  filterSchemaContents = (contents, filterFn) => {
    return lodash.uniq(contents.filter((type) => filterFn(type)));
  };

  resolveTypeName = (
    typeName,
    { suffixes, resolver, prefixes, shouldReserve = true },
  ) => {
    if (resolver) {
      return this.config.componentTypeNameResolver.resolve([], (reserved) => {
        return resolver(pascalCase(typeName), reserved);
      });
    }

    return this.config.componentTypeNameResolver.resolve(
      [
        ...(prefixes || []).map((prefix) =>
          pascalCase(`${prefix} ${typeName}`),
        ),
        ...(suffixes || []).map((suffix) =>
          pascalCase(`${typeName} ${suffix}`),
        ),
      ],
      shouldReserve,
    );
  };

  getComplexType = (schema) => {
    if (schema.oneOf) return SCHEMA_TYPES.COMPLEX_ONE_OF;
    if (schema.allOf) return SCHEMA_TYPES.COMPLEX_ALL_OF;
    if (schema.anyOf) return SCHEMA_TYPES.COMPLEX_ANY_OF;
    // TODO :(
    if (schema.not) return SCHEMA_TYPES.COMPLEX_NOT;

    return SCHEMA_TYPES.COMPLEX_UNKNOWN;
  };

  getInternalSchemaType = (schema) => {
    // Check for JSON-LD specific schemas first
    if (this.isJsonLdSchema(schema)) {
      return this.getJsonLdSchemaType(schema);
    }

    if (
      !lodash.isEmpty(schema.enum) ||
      !lodash.isEmpty(this.getEnumNames(schema))
    ) {
      return SCHEMA_TYPES.ENUM;
    }
    if (schema.discriminator) {
      return SCHEMA_TYPES.DISCRIMINATOR;
    }
    if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) {
      return SCHEMA_TYPES.COMPLEX;
    }
    if (!lodash.isEmpty(schema.properties)) {
      return SCHEMA_TYPES.OBJECT;
    }
    if (schema.type === SCHEMA_TYPES.ARRAY) {
      return SCHEMA_TYPES.ARRAY;
    }

    return SCHEMA_TYPES.PRIMITIVE;
  };

  getSchemaType = (schema) => {
    if (!schema) return this.config.Ts.Keyword.Any;

    const refTypeInfo = this.getSchemaRefType(schema);

    if (refTypeInfo) {
      return this.checkAndAddRequiredKeys(
        schema,
        this.safeAddNullToType(
          schema,
          this.typeNameFormatter.format(refTypeInfo.typeName),
        ),
      );
    }

    let resultType;

    if (this.isConstantSchema(schema)) {
      resultType = this.formatJsValue(schema.const);
    } else {
      const primitiveType = this.getSchemaPrimitiveType(schema);

      if (primitiveType == null) {
        return this.config.Ts.Keyword.Any;
      }

      const typeAlias =
        lodash.get(this.config.primitiveTypes, [
          primitiveType,
          schema.format,
        ]) ||
        lodash.get(this.config.primitiveTypes, [primitiveType, "$default"]) ||
        this.config.primitiveTypes[primitiveType];

      if (typeof typeAlias === "function") {
        resultType = typeAlias(schema, this);
      } else {
        resultType = typeAlias || primitiveType;
      }
    }

    if (!resultType) {
      return this.config.Ts.Keyword.Any;
    }

    return this.checkAndAddRequiredKeys(
      schema,
      this.safeAddNullToType(schema, resultType),
    );
  };

  buildTypeNameFromPath = (schemaPath) => {
    schemaPath = lodash.uniq(lodash.compact(schemaPath));

    if (!schemaPath || !schemaPath[0]) return null;

    return pascalCase(
      lodash.camelCase(
        lodash
          .uniq([schemaPath[0], schemaPath[schemaPath.length - 1]])
          .join("_"),
      ),
    );
  };

  isConstantSchema(schema) {
    return "const" in schema;
  }

  formatJsValue = (value) => {
    switch (typeof value) {
      case "string": {
        return this.config.Ts.StringValue(value);
      }
      case "boolean": {
        return this.config.Ts.BooleanValue(value);
      }
      case "number": {
        return this.config.Ts.NumberValue(value);
      }
      default: {
        if (value === null) {
          return this.config.Ts.NullValue(value);
        }

        return this.config.Ts.Keyword.Any;
      }
    }
  };

  /**
   * Checks if a schema is a JSON-LD schema
   */
  isJsonLdSchema = (schema) => {
    if (!schema || typeof schema !== "object") return false;

    // Check for JSON-LD markers
    return Boolean(
      schema["x-jsonld"] ||
        schema["x-jsonld-context"] ||
        schema["x-jsonld-type"] ||
        schema["x-jsonld-id"] ||
        (schema.properties &&
          (schema.properties["@context"] ||
            schema.properties["@type"] ||
            schema.properties["@id"])),
    );
  };

  /**
   * Determines the specific JSON-LD schema type
   */
  getJsonLdSchemaType = (schema) => {
    // Check for context-specific schema
    if (
      schema["x-jsonld-context-mapping"] ||
      (schema.properties &&
        Object.keys(schema.properties).some(
          (key) =>
            typeof schema.properties[key] === "object" &&
            schema.properties[key]["x-jsonld-iri"],
        ))
    ) {
      return SCHEMA_TYPES.JSONLD_CONTEXT;
    }

    // Check for type-specific schema
    if (
      schema["x-jsonld-type"] &&
      (typeof schema["x-jsonld-type"] === "string" ||
        Array.isArray(schema["x-jsonld-type"]))
    ) {
      return SCHEMA_TYPES.JSONLD_TYPE;
    }

    // Default to entity schema for JSON-LD objects
    return SCHEMA_TYPES.JSONLD_ENTITY;
  };
}
