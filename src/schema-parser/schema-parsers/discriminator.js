const _ = require("lodash");
const { pascalCase } = require("../../util/pascal-case");
const { SCHEMA_TYPES } = require("../../constants");

class DiscriminatorSchemaParser {
  schema;
  typeName;
  schemaPath;

  /**
   * @type {SchemaParser}
   */
  schemaParser;

  /**
   * @type {SchemaComponentsMap}
   */
  schemaComponentsMap;
  /**
   * @type {SchemaUtils}
   */
  schemaUtils;
  /**
   * @type {CodeGenConfig}
   */
  config;
  /**
   * @type {SchemaFormatters}
   */
  schemaFormatters;

  /**
   * @type {string}
   */
  refPath;

  constructor(schemaParser, schema, typeName, schemaPath = []) {
    this.schemaParser = schemaParser;
    this.schema = schema;
    this.typeName = typeName;
    this.schemaPath = schemaPath;
    this.schemaComponentsMap = this.schemaParser.schemaComponentsMap;
    this.schemaUtils = this.schemaParser.schemaUtils;
    this.config = this.schemaParser.config;
    this.schemaFormatters = this.schemaParser.schemaFormatters;
    this.refPath = this.schemaComponentsMap.createRef("schemas", typeName);
  }

  async parse() {
    const { discriminator, ...noDiscriminatorSchema } = this.schema;

    if (this.typeName == null || !discriminator.mapping)
      return await this.schemaParser.createParser(noDiscriminatorSchema, this.typeName, this.schemaPath).parse();

    const abstractSchemaStruct = await this.createAbstractSchemaStruct();
    const complexSchemaStruct = await this.createComplexSchemaStruct();
    const discriminatorSchemaStruct = await this.createDiscriminatorSchema({ abstractSchemaStruct });

    const schemaContent = this.config.Ts.IntersectionType(
      [
        abstractSchemaStruct?.content,
        this.config.Ts.ExpressionGroup(
          this.config.Ts.UnionType([complexSchemaStruct?.content, discriminatorSchemaStruct.content].filter(Boolean)),
        ),
      ].filter(Boolean),
    );

    return {
      ...(_.isObject(this.schema) ? this.schema : {}),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.COMPLEX,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: this.config.Ts.Keyword.Type,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(this.schema.description),
      content: schemaContent,
    };
  }

  createDiscriminatorSchema = async ({ abstractSchemaStruct }) => {
    const { discriminator } = this.schema;
    const { mapping, propertyName } = discriminator;
    const mappingEntries = _.entries(mapping);
    const complexSchemaKeys = _.keys(this.schemaParser._complexSchemaParsers);
    const ableToCreateMappingType = !!(abstractSchemaStruct?.typeName && mappingEntries.length);
    const mappingContents = [];
    let mappingTypeName;

    if (ableToCreateMappingType) {
      mappingTypeName = this.config.componentTypeNameResolver.resolve([
        pascalCase(`${abstractSchemaStruct.typeName} ${propertyName} Mapping`),
        pascalCase(`${abstractSchemaStruct.typeName} Map Type By ${propertyName}`),
        pascalCase(`${abstractSchemaStruct.typeName} Mapping`),
        pascalCase(`${abstractSchemaStruct.typeName} Mapper`),
        pascalCase(`${abstractSchemaStruct.typeName} MapType`),
      ]);
      const component = this.schemaComponentsMap.createComponent("schemas", mappingTypeName, {
        internal: true,
      });
      const schema = await this.schemaParser.createParser(component).parse();
      schema.genericArgs = [{ name: "Key" }, { name: "Type" }];
      schema.internal = true;
      schema.content = this.config.Ts.IntersectionType([
        this.config.Ts.ObjectWrapper(this.config.Ts.TypeField({ key: propertyName, value: "Key" })),
        "Type",
      ]);
      component.typeData = schema;
    }

    const createMappingContent = async (mappingSchema, mappingKey) => {
      const content = await this.schemaParser.createParser(mappingSchema).getInlineContent();

      if (ableToCreateMappingType) {
        return this.config.Ts.TypeWithGeneric(mappingTypeName, [this.config.Ts.StringValue(mappingKey), content]);
      } else {
        return this.config.Ts.ExpressionGroup(
          this.config.Ts.IntersectionType([
            this.config.Ts.ObjectWrapper(
              this.config.Ts.TypeField({
                key: propertyName,
                value: this.config.Ts.StringValue(mappingKey),
              }),
            ),
            content,
          ]),
        );
      }
    };

    for await (const [mappingKey, schema] of mappingEntries) {
      const mappingSchema = typeof schema === "string" ? { $ref: schema } : schema;

      // override parent dependencies
      if (mappingSchema.$ref && abstractSchemaStruct?.component?.$ref) {
        const mappingSchemaRefType = this.schemaUtils.getSchemaRefType(mappingSchema);
        if (mappingSchemaRefType?.rawTypeData) {
          for await (const schemaKey of complexSchemaKeys) {
            if (_.isArray(mappingSchemaRefType.rawTypeData[schemaKey])) {
              mappingSchemaRefType.rawTypeData[schemaKey] = mappingSchemaRefType.rawTypeData[schemaKey].map(
                (schema) => {
                  if (schema.$ref === this.refPath) {
                    schema.$parsed = abstractSchemaStruct.component.$parsed;
                    return { ...schema, $ref: abstractSchemaStruct.component.$ref };
                  }
                  return schema;
                },
              );
            }
          }
        }
      }

      const mappingContent = await createMappingContent(mappingSchema, mappingKey);
      mappingContents.push(mappingContent);
    }

    const content = this.config.Ts.ExpressionGroup(this.config.Ts.UnionType(mappingContents));

    return {
      content,
    };
  };

  createAbstractSchemaStruct = async () => {
    const { discriminator, ...noDiscriminatorSchema } = this.schema;
    const complexSchemaKeys = _.keys(this.schemaParser._complexSchemaParsers);
    const schema = _.omit(_.clone(noDiscriminatorSchema), complexSchemaKeys);
    const schemaIsEmpty = !_.keys(schema).length;

    if (schemaIsEmpty) return null;

    const typeName = this.config.componentTypeNameResolver.resolve([
      pascalCase(`Abstract ${this.typeName}`),
      pascalCase(`Discriminator ${this.typeName}`),
      pascalCase(`Internal ${this.typeName}`),
      pascalCase(`Polymorph ${this.typeName}`),
    ]);
    const component = this.schemaComponentsMap.createComponent("schemas", typeName, {
      ...schema,
      internal: true,
    });
    const content = await this.schemaParser.createParser(component).getInlineContent();

    return {
      typeName,
      component,
      content,
    };
  };

  createComplexSchemaStruct = async () => {
    const complexType = this.schemaParser.schemaUtils.getComplexType(this.schema);

    if (complexType === SCHEMA_TYPES.COMPLEX_UNKNOWN) return null;

    return {
      content: this.config.Ts.ExpressionGroup(await this.schemaParser._complexSchemaParsers[complexType](this.schema)),
    };
  };

  createMappingType = (typeName) => {};

  createMappingSchema = () => {};
}

module.exports = {
  DiscriminatorSchemaParser,
};
