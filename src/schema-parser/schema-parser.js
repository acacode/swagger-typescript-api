const { SchemaFormatters } = require("./schema-formatters");
const { SchemaUtils } = require("./schema-utils");
const { SCHEMA_TYPES } = require("../constants");
const _ = require("lodash");
const { internalCase } = require("../util/internal-case");
const { camelCase } = require("lodash");

class SchemaParser {
  /**
   * @type {CodeGenConfig}
   */
  config;
  /**
   * @type {SchemaComponentsMap}
   */
  schemaComponentsMap;
  /**
   * @type {TypeNameFormatter}
   */
  typeNameFormatter;
  /**
   * @type {SchemaFormatters}
   */
  schemaFormatters;

  /**
   * @type {SchemaUtils}
   */
  schemaUtils;

  schemaPath = [];

  typeName;
  schema;

  constructor(
    config,
    schemaComponentsMap,
    typeNameFormatter,
    schemaFormatters,
    schemaUtils,
    schema,
    typeName = null,
    schemaPath = [],
  ) {
    this.config = config;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeNameFormatter = typeNameFormatter;
    this.schemaFormatters = schemaFormatters;
    this.schemaUtils = schemaUtils;
    this.schema = schema;
    this.typeName = typeName;
    this.schemaPath = schemaPath;
  }

  _complexSchemaParsers = {
    // T1 | T2
    [SCHEMA_TYPES.COMPLEX_ONE_OF]: async (schema) => {
      const ignoreTypes = [this.config.Ts.Keyword.Any];
      const combined = await Promise.all(
        _.map(schema.oneOf, (childSchema) =>
          this.createParser(
            this.schemaUtils.makeAddRequiredToChildSchema(schema, childSchema),
            undefined,
            this.schemaPath,
          ).getInlineContent(),
        ),
      );
      const filtered = this.schemaUtils.filterSchemaContents(combined, (content) => !ignoreTypes.includes(content));

      const type = this.config.Ts.UnionType(filtered);

      return this.schemaUtils.safeAddNullToType(schema, type);
    },
    // T1 & T2
    [SCHEMA_TYPES.COMPLEX_ALL_OF]: async (schema) => {
      const ignoreTypes = [...this.config.jsPrimitiveTypes, this.config.Ts.Keyword.Any];
      const combined = await Promise.all(
        _.map(schema.allOf, (childSchema) =>
          this.createParser(
            this.schemaUtils.makeAddRequiredToChildSchema(schema, childSchema),
            undefined,
            this.schemaPath,
          ).getInlineContent(),
        ),
      );
      const filtered = this.schemaUtils.filterSchemaContents(combined, (content) => !ignoreTypes.includes(content));

      const type = this.config.Ts.IntersectionType(filtered);

      return this.schemaUtils.safeAddNullToType(schema, type);
    },
    // T1 | T2 | (T1 & T2)
    [SCHEMA_TYPES.COMPLEX_ANY_OF]: async (schema) => {
      const ignoreTypes = [...this.config.jsPrimitiveTypes, this.config.Ts.Keyword.Any];
      const combined = await Promise.all(
        _.map(schema.anyOf, (childSchema) =>
          this.createParser(
            this.schemaUtils.makeAddRequiredToChildSchema(schema, childSchema),
            undefined,
            this.schemaPath,
          ).getInlineContent(),
        ),
      );
      const filtered = this.schemaUtils.filterSchemaContents(combined, (content) => !ignoreTypes.includes(content));

      const type = this.config.Ts.UnionType(
        _.compact([
          ...filtered,
          filtered.length > 1 && this.config.Ts.ExpressionGroup(this.config.Ts.IntersectionType(filtered)),
        ]),
      );

      return this.schemaUtils.safeAddNullToType(schema, type);
    },
    // TODO
    [SCHEMA_TYPES.COMPLEX_NOT]: (schema) => {
      // TODO
      return this.config.Ts.Keyword.Any;
    },
  };

  _baseSchemaParsers = {
    [SCHEMA_TYPES.ENUM]: async (schema, typeName) => {
      if (this.config.extractEnums && !typeName) {
        const generatedTypeName = this.config.componentTypeNameResolver.resolve([this.buildTypeNameFromPath()]);
        const schemaComponent = this.schemaComponentsMap.createComponent("schemas", generatedTypeName, { ...schema });
        const parser = this.createParser(schemaComponent, generatedTypeName);
        return await parser.parse();
      }

      const refType = this.schemaUtils.getSchemaRefType(schema);
      const $ref = (refType && refType.$ref) || null;

      if (Array.isArray(schema.enum) && Array.isArray(schema.enum[0])) {
        return await this.createParser(
          {
            oneOf: schema.enum.map((enumNames) => ({
              type: "array",
              items: enumNames.map((enumName) => ({ type: "string", enum: [enumName] })),
            })),
          },
          typeName,
          this.schemaPath,
        ).parse();
      }

      const keyType = await this.getSchemaType(schema);
      const enumNames = this.schemaUtils.getEnumNames(schema);
      let content = null;

      const formatValue = async (value) => {
        if (value === null) {
          return this.config.Ts.NullValue(value);
        }
        if (keyType === (await this.getSchemaType({ type: "number" }))) {
          return this.config.Ts.NumberValue(value);
        }
        if (keyType === (await this.getSchemaType({ type: "boolean" }))) {
          return this.config.Ts.BooleanValue(value);
        }

        return this.config.Ts.StringValue(value);
      };

      if (_.isArray(enumNames) && _.size(enumNames)) {
        content = await Promise.all(
          _.map(enumNames, async (enumName, index) => {
            const enumValue = _.get(schema.enum, index);
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
              value: await formatValue(enumValue),
            };
          }),
        );
      } else {
        content = await Promise.all(
          _.map(schema.enum, async (key) => {
            return {
              key: this.typeNameFormatter.format(`${key}`, {
                type: "enum-key",
              }),
              type: keyType,
              value: await formatValue(key),
            };
          }),
        );
      }

      return {
        ...(_.isObject(schema) ? schema : {}),
        $ref: $ref,
        typeName: typeName || ($ref && refType.typeName) || null,
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.ENUM,
        type: SCHEMA_TYPES.ENUM,
        keyType: keyType,
        typeIdentifier: this.config.generateUnionEnums ? this.config.Ts.Keyword.Type : this.config.Ts.Keyword.Enum,
        name: typeName,
        description: this.schemaFormatters.formatDescription(schema.description),
        content,
      };
    },
    [SCHEMA_TYPES.OBJECT]: async (schema, typeName) => {
      const contentProperties = await this.getObjectSchemaContent(schema);

      return {
        ...(_.isObject(schema) ? schema : {}),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.OBJECT,
        type: SCHEMA_TYPES.OBJECT,
        typeIdentifier: this.config.Ts.Keyword.Interface,
        name: typeName,
        description: this.schemaFormatters.formatDescription(schema.description),
        allFieldsAreOptional: !_.some(_.values(contentProperties), (part) => part.isRequired),
        content: contentProperties,
      };
    },
    [SCHEMA_TYPES.COMPLEX]: async (schema, typeName) => {
      const complexType = this.getComplexType(schema);
      const simpleSchema = _.omit(_.clone(schema), _.keys(this._complexSchemaParsers));
      const complexSchemaContent = await this._complexSchemaParsers[complexType](schema);

      return {
        ...(_.isObject(schema) ? schema : {}),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.COMPLEX,
        type: SCHEMA_TYPES.PRIMITIVE,
        typeIdentifier: this.config.Ts.Keyword.Type,
        name: typeName,
        description: this.schemaFormatters.formatDescription(
          schema.description || _.compact(_.map(schema[complexType], "description"))[0] || "",
        ),
        content:
          this.config.Ts.IntersectionType(
            _.compact([
              this.config.Ts.ExpressionGroup(complexSchemaContent),
              this.getInternalSchemaType(simpleSchema) === SCHEMA_TYPES.OBJECT &&
                this.config.Ts.ExpressionGroup(
                  await this.createParser(simpleSchema, null, this.schemaPath).getInlineContent(),
                ),
            ]),
          ) || this.config.Ts.Keyword.Any,
      };
    },
    [SCHEMA_TYPES.PRIMITIVE]: async (schema, typeName) => {
      let contentType = null;
      const { additionalProperties, type, description, items } = schema || {};

      if (type === this.config.Ts.Keyword.Object && additionalProperties) {
        const fieldType = _.isObject(additionalProperties)
          ? await this.createParser(additionalProperties, null, this.schemaPath).getInlineContent()
          : this.config.Ts.Keyword.Any;
        contentType = this.config.Ts.RecordType(this.config.Ts.Keyword.String, fieldType);
      }

      if (_.isArray(type) && type.length) {
        contentType = await this._complexSchemaParsers.oneOf({
          ...(_.isObject(schema) ? schema : {}),
          oneOf: type.map((type) => ({ type })),
        });
      }

      if (_.isArray(items) && type === SCHEMA_TYPES.ARRAY) {
        contentType = this.config.Ts.Tuple(
          await Promise.all(items.map((item) => this.createParser(item, null, this.schemaPath).getInlineContent())),
        );
      }

      return {
        ...(_.isObject(schema) ? schema : {}),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.PRIMITIVE,
        type: SCHEMA_TYPES.PRIMITIVE,
        typeIdentifier: this.config.Ts.Keyword.Type,
        name: typeName,
        description: this.schemaFormatters.formatDescription(description),
        // TODO: probably it should be refactored. `type === 'null'` is not flexible
        content: type === this.config.Ts.Keyword.Null ? type : contentType || (await this.getSchemaType(schema)),
      };
    },
  };

  getInternalSchemaType = (schema) => {
    if (!_.isEmpty(schema.enum) || !_.isEmpty(this.schemaUtils.getEnumNames(schema))) return SCHEMA_TYPES.ENUM;
    if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) return SCHEMA_TYPES.COMPLEX;
    if (!_.isEmpty(schema.properties)) return SCHEMA_TYPES.OBJECT;

    return SCHEMA_TYPES.PRIMITIVE;
  };

  getSchemaType = async (schema) => {
    if (!schema) return this.config.Ts.Keyword.Any;

    const refTypeInfo = this.schemaUtils.getSchemaRefType(schema);

    if (refTypeInfo) {
      return this.schemaUtils.checkAndAddRequiredKeys(
        schema,
        this.schemaUtils.safeAddNullToType(schema, this.typeNameFormatter.format(refTypeInfo.typeName)),
      );
    }

    const primitiveType = this.schemaUtils.getSchemaPrimitiveType(schema);

    if (primitiveType == null) return this.config.Ts.Keyword.Any;

    let resultType;

    /**
     * @type {string | (() => Promise<string>)}
     */
    const typeAlias =
      _.get(this.config.primitiveTypes, [primitiveType, schema.format]) ||
      _.get(this.config.primitiveTypes, [primitiveType, "$default"]) ||
      this.config.primitiveTypes[primitiveType];

    if (_.isFunction(typeAlias)) {
      resultType = await typeAlias(schema, {
        createParser: (schema, typeName) => this.createParser(schema, typeName, this.schemaPath),
        schemaUtils: this.schemaUtils,
      });
    } else {
      resultType = typeAlias || primitiveType;
    }

    if (!resultType) return this.config.Ts.Keyword.Any;

    return this.schemaUtils.checkAndAddRequiredKeys(schema, this.schemaUtils.safeAddNullToType(schema, resultType));
  };

  getObjectSchemaContent = async (schema) => {
    const { properties, additionalProperties } = schema || {};
    const propertiesContent = [];

    const propertyEntries = _.entries(properties);

    for await (const [name, property] of propertyEntries) {
      this.schemaPath.push(name);
      const required = this.schemaUtils.isPropertyRequired(name, property, schema);
      const rawTypeData = _.get(this.schemaUtils.getSchemaRefType(property), "rawTypeData", {});
      const nullable = !!(rawTypeData.nullable || property.nullable);
      const fieldName = this.typeNameFormatter.isValidName(name) ? name : this.config.Ts.StringValue(name);
      const fieldValue = await this.createParser(property, null, this.schemaPath).getInlineContent();
      const readOnly = property.readOnly;

      this.schemaPath.pop();

      propertiesContent.push({
        ...property,
        $$raw: property,
        title: property.title,
        description:
          property.description ||
          _.compact(_.map(property[this.getComplexType(property)], "description"))[0] ||
          rawTypeData.description ||
          _.compact(_.map(rawTypeData[this.getComplexType(rawTypeData)], "description"))[0] ||
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
      propertiesContent.push({
        $$raw: { additionalProperties },
        description: "",
        isRequired: false,
        field: this.config.Ts.InterfaceDynamicField(this.config.Ts.Keyword.String, this.config.Ts.Keyword.Any),
      });
    }

    return propertiesContent;
  };

  getComplexType = (schema) => {
    if (schema.oneOf) return SCHEMA_TYPES.COMPLEX_ONE_OF;
    if (schema.allOf) return SCHEMA_TYPES.COMPLEX_ALL_OF;
    if (schema.anyOf) return SCHEMA_TYPES.COMPLEX_ANY_OF;
    // TODO :(
    if (schema.not) return SCHEMA_TYPES.COMPLEX_NOT;

    return SCHEMA_TYPES.COMPLEX_UNKNOWN;
  };

  /**
   *
   * @param schema {any}
   * @param typeName {null | string}
   * @param formatter {"inline" | "base"}
   * @return {Promise<Record<string, any>>}
   */
  parse = async () => {
    if (!this.schema) return await this._baseSchemaParsers[SCHEMA_TYPES.PRIMITIVE](null, this.typeName);

    let schemaType = null;
    let parsedSchema = null;

    if (typeof this.schema === "string") {
      return this.schema;
    }

    if (!this.schema.$parsed) {
      if (!this.typeName && this.schemaUtils.isRefSchema(this.schema)) {
        this.typeName = await this.getSchemaType(this.schema);
      }

      if (this.schema.items && !Array.isArray(this.schema.items) && !this.schema.type) {
        this.schema.type = SCHEMA_TYPES.ARRAY;
      }
      schemaType = this.getInternalSchemaType(this.schema);

      this.schemaPath.push(this.typeName);

      _.merge(this.schema, this.config.hooks.onPreParseSchema(this.schema, this.typeName, schemaType));
      parsedSchema = await this._baseSchemaParsers[schemaType](this.schema, this.typeName);
      this.schema.$parsed = this.config.hooks.onParseSchema(this.schema, parsedSchema) || parsedSchema;
    }

    this.schemaPath.pop();

    return this.schema.$parsed;
  };

  getInlineContent = async () => {
    const parsedSchema = await this.parse();
    const formattedSchema = await this.schemaFormatters.formatSchema(parsedSchema, { formatType: "inline" });
    return formattedSchema.content;
  };

  getContent = async () => {
    const parsedSchema = await this.parse();
    const formattedSchema = await this.schemaFormatters.formatSchema(parsedSchema, { formatType: "base" });
    return formattedSchema.content;
  };

  buildTypeNameFromPath = () => {
    const schemaPath = _.uniq(_.compact(this.schemaPath));

    if (!schemaPath || !schemaPath[0]) return null;

    return internalCase(camelCase(`${schemaPath[0]}_${schemaPath[schemaPath.length - 1]}`));
  };

  /**
   * @param {Record<string, any>} [schema]
   * @param {string | null | undefined} [typeName]
   * @param {string[] | undefined} [schemaPath]
   * @return {SchemaParser}
   */
  createParser = (schema, typeName, schemaPath) => {
    return new SchemaParser(
      this.config,
      this.schemaComponentsMap,
      this.typeNameFormatter,
      this.schemaFormatters,
      this.schemaUtils,
      schema,
      typeName,
      schemaPath,
    );
  };

  /**
   * @param config {CodeGenConfig}
   * @param schemaComponentsMap {SchemaComponentsMap}
   * @param typeNameFormatter {TypeNameFormatter}
   * @param schemaFormatters {SchemaFormatters}
   * @param schemaUtils {SchemaUtils}
   * @param {Record<string, any>} [schema]
   * @param {string | null | undefined} [typeName]
   * @param {string[] | undefined} [schemaPath]
   * @return {SchemaParser}
   */
  static create(
    config,
    schemaComponentsMap,
    typeNameFormatter,
    schemaFormatters,
    schemaUtils,
    schema,
    typeName,
    schemaPath,
  ) {
    return new SchemaParser(
      config,
      schemaComponentsMap,
      typeNameFormatter,
      schemaFormatters,
      schemaUtils,
      schema,
      typeName,
      schemaPath,
    );
  }
}

module.exports = {
  SchemaParser,
};
