const _ = require("lodash");
const { SCHEMA_TYPES } = require("../constants");
const { internalCase } = require("../util/internal-case");
const { pascalCase } = require("../util/pascal-case");
const { camelCase } = require("lodash");

class SchemaUtils {
  /** @type {CodeGenConfig} */
  config;
  /** @type {SchemaComponentsMap} */
  schemaComponentsMap;
  /** @type {TypeNameFormatter} */
  typeNameFormatter;
  /** @type {SchemaWalker} */
  schemaWalker;

  constructor({ config, schemaComponentsMap, typeNameFormatter, schemaWalker }) {
    this.config = config;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeNameFormatter = typeNameFormatter;
    this.schemaWalker = schemaWalker;
  }

  getRequiredProperties = (schema) => {
    return _.uniq((schema && _.isArray(schema.required) && schema.required) || []);
  };

  isRefSchema = (schema) => {
    return !!(schema && schema["$ref"]);
  };

  getEnumNames = (schema) => {
    return schema["x-enumNames"] || schema["xEnumNames"] || schema["x-enumnames"] || schema["x-enum-varnames"];
  };

  getSchemaRefType = (schema) => {
    if (!this.isRefSchema(schema)) return null;
    // const resolved = this.schemaWalker.findByRef(schema.$ref);
    return this.schemaComponentsMap.get(schema.$ref);
  };

  isPropertyRequired = (name, propertySchema, rootSchema) => {
    if (propertySchema["x-omitempty"] === false) {
      return true;
    }

    const isRequired = _.isBoolean(propertySchema.required)
      ? !!propertySchema.required
      : _.isArray(rootSchema.required)
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
      (nullable || !!_.get(schema, "x-nullable") || schemaType === this.config.Ts.Keyword.Null) &&
      _.isString(type) &&
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
    if (_.keys(schema.properties).length) {
      return SCHEMA_TYPES.OBJECT;
    }
    if (!!schema.items) {
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
      return this.config.Ts.TypeWithGeneric(this.config.Ts.CodeGenKeyword.UtilRequiredKeys, [
        resultType,
        this.config.Ts.UnionType(schema.$$requiredKeys.map(this.config.Ts.StringValue)),
      ]);
    }

    return resultType;
  };

  makeAddRequiredToChildSchema = (parentSchema, childSchema) => {
    if (!childSchema) return childSchema;

    const required = _.uniq([...this.getRequiredProperties(parentSchema), ...this.getRequiredProperties(childSchema)]);

    const refData = this.getSchemaRefType(childSchema);

    if (refData) {
      const refObjectProperties = _.keys((refData.rawTypeData && refData.rawTypeData.properties) || {});
      const existedRequiredKeys = refObjectProperties.filter((key) => required.includes(key));

      if (!existedRequiredKeys.length) return childSchema;

      return {
        ...childSchema,
        $$requiredKeys: existedRequiredKeys,
      };
    } else if (childSchema.properties) {
      const childSchemaProperties = _.keys(childSchema.properties);
      const existedRequiredKeys = childSchemaProperties.filter((key) => required.includes(key));

      if (!existedRequiredKeys.length) return childSchema;

      return {
        required: _.uniq([...this.getRequiredProperties(childSchema), ...existedRequiredKeys]),
        ...childSchema,
      };
    }

    return childSchema;
  };

  filterSchemaContents = (contents, filterFn) => {
    return _.uniq(_.filter(contents, (type) => filterFn(type)));
  };

  resolveTypeName = (typeName, { suffixes, resolver, prefixes }) => {
    if (resolver) {
      return this.config.componentTypeNameResolver.resolve(null, (reserved) => {
        return resolver(pascalCase(typeName), reserved);
      });
    } else {
      return this.config.componentTypeNameResolver.resolve([
        ...(prefixes || []).map((prefix) => pascalCase(`${prefix} ${typeName}`)),
        ...(suffixes || []).map((suffix) => pascalCase(`${typeName} ${suffix}`)),
      ]);
    }
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
    if (!_.isEmpty(schema.enum) || !_.isEmpty(this.getEnumNames(schema))) return SCHEMA_TYPES.ENUM;
    if (schema.discriminator) return SCHEMA_TYPES.DISCRIMINATOR;
    if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) return SCHEMA_TYPES.COMPLEX;
    if (!_.isEmpty(schema.properties)) return SCHEMA_TYPES.OBJECT;
    if (schema.type === SCHEMA_TYPES.ARRAY) return SCHEMA_TYPES.ARRAY;

    return SCHEMA_TYPES.PRIMITIVE;
  };

  getSchemaType = (schema) => {
    if (!schema) return this.config.Ts.Keyword.Any;

    const refTypeInfo = this.getSchemaRefType(schema);

    if (refTypeInfo) {
      return this.checkAndAddRequiredKeys(
        schema,
        this.safeAddNullToType(schema, this.typeNameFormatter.format(refTypeInfo.typeName)),
      );
    }

    const primitiveType = this.getSchemaPrimitiveType(schema);

    if (primitiveType == null) return this.config.Ts.Keyword.Any;

    let resultType;

    const typeAlias =
      _.get(this.config.primitiveTypes, [primitiveType, schema.format]) ||
      _.get(this.config.primitiveTypes, [primitiveType, "$default"]) ||
      this.config.primitiveTypes[primitiveType];

    if (_.isFunction(typeAlias)) {
      resultType = typeAlias(schema, this);
    } else {
      resultType = typeAlias || primitiveType;
    }

    if (!resultType) return this.config.Ts.Keyword.Any;

    return this.checkAndAddRequiredKeys(schema, this.safeAddNullToType(schema, resultType));
  };

  buildTypeNameFromPath = (schemaPath) => {
    schemaPath = _.uniq(_.compact(schemaPath));

    if (!schemaPath || !schemaPath[0]) return null;

    return pascalCase(camelCase(_.uniq([schemaPath[0], schemaPath[schemaPath.length - 1]]).join("_")));
  };
}

module.exports = {
  SchemaUtils,
};
