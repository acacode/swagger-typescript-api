const _ = require("lodash");
const { pascalCase } = require("../../util/pascal-case");
const { SCHEMA_TYPES } = require("../../constants");
const { MonoSchemaParser } = require("../mono-schema-parser");

class DiscriminatorSchemaParser extends MonoSchemaParser {
  parse() {
    const { discriminator, ...noDiscriminatorSchema } = this.schema;

    if (this.typeName == null || !discriminator.mapping) {
      return this.schemaParserFabric
        .createSchemaParser({
          schema: noDiscriminatorSchema,
          typeName: this.typeName,
          schemaPath: this.schemaPath,
        })
        .parseSchema();
    }

    // https://github.com/acacode/swagger-typescript-api/issues/456
    const skipMappingType = !!noDiscriminatorSchema.oneOf;

    const abstractSchemaStruct = this.createAbstractSchemaStruct();
    const complexSchemaStruct = this.createComplexSchemaStruct();
    const discriminatorSchemaStruct = this.createDiscriminatorSchema({
      skipMappingType,
      abstractSchemaStruct,
    });

    const schemaContent = this.config.Ts.IntersectionType(
      [
        abstractSchemaStruct?.content,
        this.config.Ts.ExpressionGroup(
          this.config.Ts.UnionType([complexSchemaStruct?.content, discriminatorSchemaStruct?.content].filter(Boolean)),
        ),
      ].filter(Boolean),
    );

    return {
      ...(_.isObject(this.schema) ? this.schema : {}),
      $schemaPath: this.schemaPath.slice(),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.COMPLEX,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: this.config.Ts.Keyword.Type,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(this.schema.description),
      content: schemaContent,
    };
  }

  createDiscriminatorSchema = ({ skipMappingType, abstractSchemaStruct }) => {
    const refPath = this.schemaComponentsMap.createRef(["components", "schemas", this.typeName]);
    const { discriminator } = this.schema;
    const mappingEntries = _.entries(discriminator.mapping);
    const ableToCreateMappingType = !skipMappingType && !!(abstractSchemaStruct?.typeName && mappingEntries.length);
    const mappingContents = [];
    let mappingTypeName;

    /** { mapping_key: SchemaEnum.MappingKey, ... } */
    const mappingPropertySchemaEnumKeysMap = this.createMappingPropertySchemaEnumKeys({
      abstractSchemaStruct,
      discPropertyName: discriminator.propertyName,
    });

    if (ableToCreateMappingType) {
      mappingTypeName = this.schemaUtils.resolveTypeName(
        `${abstractSchemaStruct.typeName} ${discriminator.propertyName}`,
        {
          suffixes: this.config.extractingOptions.discriminatorMappingSuffix,
          resolver: this.config.extractingOptions.discriminatorMappingNameResolver,
        },
      );
      this.schemaParserFabric.createSchema({
        linkedComponent: this.schemaComponentsMap.createComponent(
          this.schemaComponentsMap.createRef(["components", "schemas", mappingTypeName]),
        ),
        content: this.config.Ts.IntersectionType([
          this.config.Ts.ObjectWrapper(this.config.Ts.TypeField({ key: discriminator.propertyName, value: "Key" })),
          "Type",
        ]),
        genericArgs: [{ name: "Key" }, { name: "Type" }],
        internal: true,
      });
    }

    /** returns (GenericType<"mapping_key", MappingType>) or ({ discriminatorProperty: "mapping_key" } & MappingType) */
    const createMappingContent = (mappingSchema, mappingKey) => {
      const content = this.schemaParserFabric
        .createSchemaParser({
          schema: mappingSchema,
          schemaPath: this.schemaPath,
        })
        .getInlineParseContent();

      const mappingUsageKey = mappingPropertySchemaEnumKeysMap[mappingKey] || this.config.Ts.StringValue(mappingKey);

      if (ableToCreateMappingType) {
        return this.config.Ts.TypeWithGeneric(mappingTypeName, [mappingUsageKey, content]);
      } else {
        return this.config.Ts.ExpressionGroup(
          this.config.Ts.IntersectionType([
            this.config.Ts.ObjectWrapper(
              this.config.Ts.TypeField({
                key: discriminator.propertyName,
                value: mappingUsageKey,
              }),
            ),
            content,
          ]),
        );
      }
    };

    for (const [mappingKey, schema] of mappingEntries) {
      const mappingSchema = typeof schema === "string" ? { $ref: schema } : schema;

      this.mutateMappingDependentSchema({
        discPropertyName: discriminator.propertyName,
        abstractSchemaStruct,
        mappingSchema,
        refPath,
        mappingPropertySchemaEnumKeysMap,
      });

      mappingContents.push(createMappingContent(mappingSchema, mappingKey));
    }

    if (skipMappingType) return null;

    const content = this.config.Ts.ExpressionGroup(this.config.Ts.UnionType(mappingContents));

    return {
      content,
    };
  };

  createMappingPropertySchemaEnumKeys = ({ abstractSchemaStruct, discPropertyName }) => {
    let mappingPropertySchemaEnumKeysMap = {};
    let mappingPropertySchema = _.get(abstractSchemaStruct?.component?.rawTypeData, ["properties", discPropertyName]);
    if (this.schemaUtils.isRefSchema(mappingPropertySchema)) {
      mappingPropertySchema = this.schemaUtils.getSchemaRefType(mappingPropertySchema);
    }

    if (mappingPropertySchema?.rawTypeData?.$parsed?.type === SCHEMA_TYPES.ENUM) {
      mappingPropertySchemaEnumKeysMap = _.reduce(
        mappingPropertySchema.rawTypeData.$parsed.enum,
        (acc, key, index) => {
          const enumKey = mappingPropertySchema.rawTypeData.$parsed.content[index].key;
          acc[key] = this.config.Ts.EnumUsageKey(mappingPropertySchema.rawTypeData.$parsed.typeName, enumKey);
          return acc;
        },
        {},
      );
    }

    return mappingPropertySchemaEnumKeysMap;
  };

  mutateMappingDependentSchema = ({
    discPropertyName,
    abstractSchemaStruct,
    mappingSchema,
    refPath,
    mappingPropertySchemaEnumKeysMap,
  }) => {
    const complexSchemaKeys = _.keys(this.schemaParser._complexSchemaParsers);
    // override parent dependencies
    if (mappingSchema.$ref && abstractSchemaStruct?.component?.$ref) {
      const mappingRefSchema = this.schemaUtils.getSchemaRefType(mappingSchema)?.rawTypeData;
      if (mappingRefSchema) {
        complexSchemaKeys.forEach((schemaKey) => {
          if (_.isArray(mappingRefSchema[schemaKey])) {
            mappingRefSchema[schemaKey] = mappingRefSchema[schemaKey].map((schema) => {
              if (schema.$ref === refPath) {
                return { ...schema, $ref: abstractSchemaStruct.component.$ref };
              }
              if (this.schemaUtils.getInternalSchemaType(schema) === SCHEMA_TYPES.OBJECT) {
                for (const schemaPropertyName in schema.properties) {
                  const schemaProperty = schema.properties[schemaPropertyName];
                  if (
                    schemaPropertyName === discPropertyName &&
                    this.schemaUtils.getInternalSchemaType(schemaProperty) === SCHEMA_TYPES.ENUM &&
                    schemaProperty.enum.length === 1 &&
                    mappingPropertySchemaEnumKeysMap[schemaProperty.enum[0]]
                  ) {
                    schema.properties[schemaPropertyName] = this.schemaParserFabric.createSchema({
                      content: mappingPropertySchemaEnumKeysMap[schemaProperty.enum[0]],
                    });
                  }
                }
              }
              return schema;
            });
          }
        });
      }
    }
  };

  createAbstractSchemaStruct = () => {
    const { discriminator, ...noDiscriminatorSchema } = this.schema;
    const complexSchemaKeys = _.keys(this.schemaParser._complexSchemaParsers);
    const schema = _.omit(_.clone(noDiscriminatorSchema), complexSchemaKeys);
    const schemaIsEmpty = !_.keys(schema).length;

    if (schemaIsEmpty) return null;

    const typeName = this.schemaUtils.resolveTypeName(this.typeName, {
      prefixes: this.config.extractingOptions.discriminatorAbstractPrefix,
      resolver: this.config.extractingOptions.discriminatorAbstractResolver,
    });
    const component = this.schemaComponentsMap.createComponent(
      this.schemaComponentsMap.createRef(["components", "schemas", typeName]),
      {
        ...schema,
        internal: true,
      },
    );
    const content = this.schemaParserFabric
      .createSchemaParser({ schema: component, schemaPath: this.schemaPath })
      .getInlineParseContent();

    return {
      typeName,
      component,
      content,
    };
  };

  createComplexSchemaStruct = () => {
    const complexType = this.schemaUtils.getComplexType(this.schema);

    if (complexType === SCHEMA_TYPES.COMPLEX_UNKNOWN) return null;

    return {
      content: this.config.Ts.ExpressionGroup(this.schemaParser._complexSchemaParsers[complexType](this.schema)),
    };
  };
}

module.exports = {
  DiscriminatorSchemaParser,
};
