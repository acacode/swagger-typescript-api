import lodash from "lodash";
import { SCHEMA_TYPES } from "../../constants.js";
import { MonoSchemaParser } from "../mono-schema-parser.js";

export class ObjectSchemaParser extends MonoSchemaParser {
  override parse() {
    const contentProperties = this.getObjectSchemaContent(this.schema);

    return {
      ...(typeof this.schema === "object" ? this.schema : {}),
      $schemaPath: this.schemaPath.slice(),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.OBJECT,
      type: SCHEMA_TYPES.OBJECT,
      typeIdentifier: this.config.Ts.Keyword.Interface,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(
        this.schema.description,
      ),
      allFieldsAreOptional: !contentProperties.some((part) => part.isRequired),
      content: contentProperties,
    };
  }

  getObjectSchemaContent = (schema) => {
    const { properties, additionalProperties } = schema || {};

    const propertiesContent = lodash.map(properties, (property, name) => {
      const required = this.schemaUtils.isPropertyRequired(
        name,
        property,
        schema,
      );
      const rawTypeData = lodash.get(
        this.schemaUtils.getSchemaRefType(property),
        "rawTypeData",
        {},
      );
      // In OpenAPI v3.1 the nullable property was replaced with a "typed
      // array", that is an array that can either be of type T or null.
      if (Array.isArray(property.type) && property.type.length == 2) {
        if (property.type[0] == "null") {
          property.type = property.type[1];
          property.nullable = true;
        } else if (property.type[1] == "null") {
          property.type = property.type[0];
          property.nullable = true;
        }
      }
      const nullable = !!(rawTypeData.nullable || property.nullable);
      const fieldName = this.typeNameFormatter.isValidName(name)
        ? name
        : this.config.Ts.StringValue(name);
      const fieldValue = this.schemaParserFabric
        .createSchemaParser({
          schema: property,
          schemaPath: [...this.schemaPath, name],
        })
        .getInlineParseContent();
      const readOnly = property.readOnly;

      return {
        ...property,
        $$raw: property,
        title: property.title,
        description:
          property.description ||
          lodash.compact(
            lodash.map(
              property[this.schemaUtils.getComplexType(property)],
              "description",
            ),
          )[0] ||
          rawTypeData.description ||
          lodash.compact(
            lodash.map(
              rawTypeData[this.schemaUtils.getComplexType(rawTypeData)],
              "description",
            ),
          )[0] ||
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
        field: this.config.Ts.InterfaceDynamicField(
          this.config.Ts.Keyword.String,
          this.config.Ts.Keyword.Any,
        ),
      });
    }

    return propertiesContent;
  };
}
