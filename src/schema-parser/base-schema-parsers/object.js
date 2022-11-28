const { MonoSchemaParser } = require("../mono-schema-parser");
const _ = require("lodash");
const { SCHEMA_TYPES } = require("../../constants");

class ObjectSchemaParser extends MonoSchemaParser {
  parse() {
    const contentProperties = this.getObjectSchemaContent(this.schema);

    return {
      ...(_.isObject(this.schema) ? this.schema : {}),
      $schemaPath: this.schemaPath.slice(),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.OBJECT,
      type: SCHEMA_TYPES.OBJECT,
      typeIdentifier: this.config.Ts.Keyword.Interface,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(this.schema.description),
      allFieldsAreOptional: !_.some(_.values(contentProperties), (part) => part.isRequired),
      content: contentProperties,
    };
  }

  getObjectSchemaContent = (schema) => {
    const { properties, additionalProperties } = schema || {};

    const propertiesContent = _.map(properties, (property, name) => {
      const required = this.schemaUtils.isPropertyRequired(name, property, schema);
      const rawTypeData = _.get(this.schemaUtils.getSchemaRefType(property), "rawTypeData", {});
      const nullable = !!(rawTypeData.nullable || property.nullable);
      const fieldName = this.typeNameFormatter.isValidName(name) ? name : this.config.Ts.StringValue(name);
      const fieldValue = this.schemaParserFabric
        .createSchemaParser({ schema: property, schemaPath: [...this.schemaPath, name] })
        .getInlineParseContent();
      const readOnly = property.readOnly;

      return {
        ...property,
        $$raw: property,
        title: property.title,
        description:
          property.description ||
          _.compact(_.map(property[this.schemaUtils.getComplexType(property)], "description"))[0] ||
          rawTypeData.description ||
          _.compact(_.map(rawTypeData[this.schemaUtils.getComplexType(rawTypeData)], "description"))[0] ||
          "",
        isRequired: required,
        isNullable: nullable,
        name: fieldName,
        value: fieldValue,
        field: this.config.Ts.TypeField({
          readonly: readOnly && this.config.addReadonly,
          optional: !required,
          key: fieldName,
          value: fieldValue,
        }),
      };
    });

    if (additionalProperties) {
      propertiesContent.push({
        $$raw: { additionalProperties },
        description: "",
        isRequired: false,
        field: this.config.Ts.InterfaceDynamicField(this.config.Ts.Keyword.String, this.config.Ts.Keyword.Any),
      });
    }

    return propertiesContent;
  };
}

module.exports = {
  ObjectSchemaParser,
};
