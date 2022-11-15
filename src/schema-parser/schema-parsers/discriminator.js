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

  parse() {
    const { discriminator, ...noDiscriminatorSchema } = this.schema;

    if (this.typeName == null || !discriminator.mapping)
      return this.schemaParser.parseSchema(noDiscriminatorSchema, this.typeName, this.schemaPath);

    const abstractSchemaStruct = this.createAbstractSchemaStruct();
    const complexSchemaStruct = this.createComplexSchemaStruct();
    const discriminatorSchemaStruct = this.createDiscriminatorSchema({ abstractSchemaStruct });

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

  createDiscriminatorSchema = ({ abstractSchemaStruct }) => {
    const { discriminator } = this.schema;
    const { mapping, propertyName } = discriminator;
    const mappingEntries = _.entries(mapping);
    const complexSchemaKeys = _.keys(this.schemaParser.complexSchemaParsers);
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
      const schema = this.schemaParser.parseSchema(component);
      schema.genericArgs = [{ name: "Key" }, { name: "Type" }];
      schema.internal = true;
      schema.content = this.config.Ts.IntersectionType([
        this.config.Ts.ObjectWrapper(this.config.Ts.TypeField({ key: propertyName, value: "Key" })),
        "Type",
      ]);
      component.typeData = schema;
    }

    const createMappingContent = (mappingSchema, mappingKey) => {
      const content = this.schemaParser.getInlineParseContent(mappingSchema);

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

    for (const [mappingKey, schema] of mappingEntries) {
      const mappingSchema = typeof schema === "string" ? { $ref: schema } : schema;

      // override parent dependencies
      if (mappingSchema.$ref && abstractSchemaStruct?.component?.$ref) {
        const mappingRefSchema = this.schemaUtils.getSchemaRefType(mappingSchema)?.rawTypeData;
        if (mappingRefSchema) {
          complexSchemaKeys.forEach((schemaKey) => {
            if (_.isArray(mappingRefSchema[schemaKey])) {
              mappingRefSchema[schemaKey] = mappingRefSchema[schemaKey].map((schema) => {
                if (schema.$ref === this.refPath) {
                  return { ...schema, $ref: abstractSchemaStruct.component.$ref };
                }
                return schema;
              });
            }
          });
        }
      }

      mappingContents.push(createMappingContent(mappingSchema, mappingKey));
    }

    const content = this.config.Ts.ExpressionGroup(this.config.Ts.UnionType(mappingContents));

    return {
      content,
    };
  };

  createAbstractSchemaStruct = () => {
    const { discriminator, ...noDiscriminatorSchema } = this.schema;
    const complexSchemaKeys = _.keys(this.schemaParser.complexSchemaParsers);
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
    const content = this.schemaParser.getInlineParseContent(component);

    return {
      typeName,
      component,
      content,
    };
  };

  createComplexSchemaStruct = () => {
    const complexType = this.schemaParser.getComplexType(this.schema);

    if (complexType === SCHEMA_TYPES.COMPLEX_UNKNOWN) return null;

    return {
      content: this.config.Ts.ExpressionGroup(this.schemaParser.complexSchemaParsers[complexType](this.schema)),
    };
  };

  createMappingType = (typeName) => {};

  createMappingSchema = () => {};
}

module.exports = {
  DiscriminatorSchemaParser,
};
