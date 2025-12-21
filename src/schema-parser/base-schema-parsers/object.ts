import { compact } from "es-toolkit";
import { get } from "es-toolkit/compat";
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

    const propertiesContent: any[] = [];

    for (const [name, property] of Object.entries(properties || {})) {
      const required = this.schemaUtils.isPropertyRequired(
        name,
        property as Record<string, unknown>,
        schema,
      );
      const rawTypeData = get(
        this.schemaUtils.getSchemaRefType(property),
        "rawTypeData",
        {},
      );
      const nullable = !!(
        rawTypeData.nullable || (property as Record<string, unknown>).nullable
      );
      const fieldName = this.typeNameFormatter.isValidName(name)
        ? name
        : this.config.Ts.StringValue(name);
      const fieldValue = this.schemaParserFabric
        .createSchemaParser({
          schema: property,
          schemaPath: [...this.schemaPath, name],
        })
        .getInlineParseContent();
      const readOnly = (property as Record<string, unknown>).readOnly;

      const complexType = this.schemaUtils.getComplexType(property);
      const rawDataComplexType = this.schemaUtils.getComplexType(rawTypeData);

      propertiesContent.push({
        ...(property as object),
        $$raw: property,
        title: (property as Record<string, unknown>).title,
        description:
          (property as Record<string, unknown>).description ||
          compact(
            (
              ((property as Record<string, unknown>)[complexType] as any[]) ||
              []
            ).map((item: any) => item?.description),
          )[0] ||
          rawTypeData.description ||
          compact(
            ((rawTypeData[rawDataComplexType] as any[]) || []).map(
              (item: any) => item?.description,
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
      });
    }

    if (additionalProperties) {
      const propertyNamesSchema =
        this.schemaUtils.getSchemaPropertyNamesSchema(schema);
      let interfaceKeysContent: any;

      if (propertyNamesSchema) {
        interfaceKeysContent = this.schemaParserFabric
          .createSchemaParser({
            schema: propertyNamesSchema,
            schemaPath: this.schemaPath,
          })
          .getInlineParseContent();
      } else {
        interfaceKeysContent = this.config.Ts.Keyword.String;
      }

      propertiesContent.push({
        $$raw: { additionalProperties },
        description: "",
        isRequired: false,
        field: this.config.Ts.InterfaceDynamicField(
          interfaceKeysContent,
          this.config.Ts.Keyword.Any,
        ),
      });
    }

    return propertiesContent;
  };
}
