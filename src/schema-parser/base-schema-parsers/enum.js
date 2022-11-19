const { MonoSchemaParser } = require("../mono-schema-parser");
const { pascalCase } = require("../../util/pascal-case");
const _ = require("lodash");
const { SCHEMA_TYPES } = require("../../constants");

class EnumSchemaParser extends MonoSchemaParser {
  parse() {
    const pathTypeName = this.buildTypeNameFromPath();

    if (this.config.extractEnums && !this.typeName && pathTypeName != null) {
      const generatedTypeName = this.config.componentTypeNameResolver.resolve([
        pathTypeName,
        pascalCase(`${pathTypeName} Enum`),
      ]);
      const customComponent = this.schemaComponentsMap.createComponent("schemas", generatedTypeName, {
        ...this.schema,
      });
      return this.schemaParserFabric
        .createSchemaParser({ schema: customComponent, typeName: generatedTypeName })
        .parseSchema();
    }

    const refType = this.schemaUtils.getSchemaRefType(this.schema);
    const $ref = (refType && refType.$ref) || null;

    if (Array.isArray(this.schema.enum) && Array.isArray(this.schema.enum[0])) {
      return this.schemaParserFabric
        .createSchemaParser({
          schema: {
            oneOf: this.schema.enum.map((enumNames) => ({
              type: "array",
              items: enumNames.map((enumName) => ({ type: "string", enum: [enumName] })),
            })),
          },
          typeName: this.typeName,
          schemaPath: this.schemaPath,
        })
        .parseSchema();
    }

    const keyType = this.schemaUtils.getSchemaType(this.schema);
    const enumNames = this.schemaUtils.getEnumNames(this.schema);
    let content = null;

    const formatValue = (value) => {
      if (value === null) {
        return this.config.Ts.NullValue(value);
      }
      if (keyType === this.schemaUtils.getSchemaType({ type: "number" })) {
        return this.config.Ts.NumberValue(value);
      }
      if (keyType === this.schemaUtils.getSchemaType({ type: "boolean" })) {
        return this.config.Ts.BooleanValue(value);
      }

      return this.config.Ts.StringValue(value);
    };

    if (_.isArray(enumNames) && _.size(enumNames)) {
      content = _.map(enumNames, (enumName, index) => {
        const enumValue = _.get(this.schema.enum, index);
        const formattedKey =
          (enumName &&
            this.typeNameFormatter.format(enumName, {
              type: "enum-key",
            })) ||
          this.typeNameFormatter.format(`${enumValue}`, {
            type: "enum-key",
          });

        if (this.config.enumNamesAsValues || _.isUndefined(enumValue)) {
          return {
            key: formattedKey,
            type: this.config.Ts.Keyword.String,
            value: this.config.Ts.StringValue(enumName),
          };
        }

        return {
          key: formattedKey,
          type: keyType,
          value: formatValue(enumValue),
        };
      });
    } else {
      content = _.map(this.schema.enum, (key) => {
        return {
          key: this.typeNameFormatter.format(`${key}`, {
            type: "enum-key",
          }),
          type: keyType,
          value: formatValue(key),
        };
      });
    }

    return {
      ...(_.isObject(this.schema) ? this.schema : {}),
      $ref: $ref,
      typeName: this.typeName || ($ref && refType.typeName) || null,
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.ENUM,
      type: SCHEMA_TYPES.ENUM,
      keyType: keyType,
      typeIdentifier: this.config.generateUnionEnums ? this.config.Ts.Keyword.Type : this.config.Ts.Keyword.Enum,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(this.schema.description),
      content,
    };
  }
}

module.exports = {
  EnumSchemaParser,
};
