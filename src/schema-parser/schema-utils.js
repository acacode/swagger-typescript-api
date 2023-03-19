const _ = require("lodash");
const { SCHEMA_TYPES } = require("../constants");
const { internalCase } = require("../util/internal-case");
const { pascalCase } = require("../util/pascal-case");

class SchemaUtils {
  /**
   * @type {CodeGenConfig}
   */
  config;
  /**
   * @type {SchemaComponentsMap}
   */
  schemaComponentsMap;

  constructor(config, schemaComponentsMap) {
    this.config = config;
    this.schemaComponentsMap = schemaComponentsMap;
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

  resolveTypeName = (typeName, suffixes, resolver, shouldReserve = true) => {
    if (resolver) {
      return this.config.componentTypeNameResolver.resolve((reserved) => {
        const variant = resolver(pascalCase(typeName), reserved);
        if (variant == null) return variant;
        return pascalCase(variant);
      });
    } else {
      return this.config.componentTypeNameResolver.resolve(
        suffixes.map((suffix) => pascalCase(`${typeName} ${suffix}`)),
        shouldReserve,
      );
    }
  };
}

module.exports = {
  SchemaUtils,
};
