import lodash from "lodash";
import { SCHEMA_TYPES } from "../../constants.js";
import { MonoSchemaParser } from "../mono-schema-parser.js";
import { EnumKeyResolver } from "../util/enum-key-resolver.js";

export class EnumSchemaParser extends MonoSchemaParser {
  enumKeyResolver: EnumKeyResolver;

  constructor(...args) {
    // @ts-expect-error TS(2556) FIXME: A spread argument must either have a tuple type or... Remove this comment to see the full error message
    super(...args);
    this.enumKeyResolver = new EnumKeyResolver(this.config, []);
  }

  extractEnum = (pathTypeName) => {
    const generatedTypeName = this.schemaUtils.resolveTypeName(pathTypeName, {
      suffixes: this.config.extractingOptions.enumSuffix,
      resolver: this.config.extractingOptions.enumNameResolver,
    });
    const customComponent = this.schemaComponentsMap.createComponent(
      this.schemaComponentsMap.createRef([
        "components",
        "schemas",
        generatedTypeName,
      ]),
      {
        ...this.schema,
      },
    );
    return this.schemaParserFabric.parseSchema(customComponent);
  };

  override parse() {
    const pathTypeName = this.buildTypeNameFromPath();

    if (this.config.extractEnums && !this.typeName && pathTypeName != null) {
      return this.extractEnum(pathTypeName);
    }

    const refType = this.schemaUtils.getSchemaRefType(this.schema);
    const $ref = refType?.$ref || null;

    // fix schema when enum has length 1+ but value is []
    if (Array.isArray(this.schema.enum)) {
      this.schema.enum = this.schema.enum.filter((key) => key != null);
    }

    if (Array.isArray(this.schema.enum) && Array.isArray(this.schema.enum[0])) {
      return this.schemaParserFabric.parseSchema(
        {
          oneOf: this.schema.enum.map((enumNames) => ({
            type: "array",
            items: enumNames.map((enumName) => ({
              type: "string",
              enum: [enumName],
            })),
          })),
        },
        this.typeName,
        this.schemaPath,
      );
    }

    const keyType = this.schemaUtils.getSchemaType(this.schema);
    const enumNames = this.schemaUtils.getEnumNames(this.schema);
    let content = null;

    const formatValue = (value) => {
      if (value === null) {
        return this.config.Ts.NullValue(value);
      }
      if (
        keyType.includes(this.schemaUtils.getSchemaType({ type: "number" }))
      ) {
        return this.config.Ts.NumberValue(value);
      }
      if (
        keyType.includes(this.schemaUtils.getSchemaType({ type: "boolean" }))
      ) {
        return this.config.Ts.BooleanValue(value);
      }

      return this.config.Ts.StringValue(value);
    };

    if (Array.isArray(enumNames) && lodash.size(enumNames)) {
      content = enumNames.map((enumName, index) => {
        const enumValue = lodash.get(this.schema.enum, index);
        const formattedKey = this.formatEnumKey({
          key: enumName,
          value: enumValue,
        });

        if (this.config.enumNamesAsValues || enumValue === undefined) {
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
      content = this.schema.enum.map((value) => {
        return {
          // @ts-expect-error TS(2345) FIXME: Argument of type '{ value: any; }' is not assignab... Remove this comment to see the full error message
          key: this.formatEnumKey({ value }),
          type: keyType,
          value: formatValue(value),
        };
      });
    }

    return {
      ...(typeof this.schema === "object" ? this.schema : {}),
      $ref: $ref,
      typeName: this.typeName || ($ref && refType.typeName) || null,
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.ENUM,
      type: SCHEMA_TYPES.ENUM,
      keyType: keyType,
      typeIdentifier:
        this.config.generateUnionEnums ||
        this.config.generateErasableSyntaxEnums
          ? this.config.Ts.Keyword.Type
          : this.config.Ts.Keyword.Enum,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(
        this.schema.description,
      ),
      content,
    };
  }

  formatEnumKey = ({ key, value }) => {
    let formatted;

    if (key) {
      formatted = this.typeNameFormatter.format(key, {
        type: "enum-key",
      });
    }

    if (!formatted) {
      formatted = this.typeNameFormatter.format(`${value}`, {
        type: "enum-key",
      });
    }

    return this.enumKeyResolver.resolve([formatted]);
  };
}
