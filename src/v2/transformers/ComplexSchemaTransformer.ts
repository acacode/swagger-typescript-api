import { SchemaContainer } from "../models/components/SchemaContainer";
import { SchemaTransformer } from "./SchemaTransformer";

export class ComplexSchemaTransformer extends SchemaTransformer {
  transform() {
    const { oneOf, anyOf, allOf, not } = this.schema;

    // T1 | T2
    if (oneOf) {
    }

    // T1 | T2 | (T1 & T2)
    if (anyOf) {
    }

    // T1 & T2
    if (allOf) {
    }

    // TODO:
    if (not) {
      // TODO:
      return "";
    }

    return "";
    // if (this.schema.)
  }
}

/*
  TODO:!:))))
  oneOf: (schema) => {
    // T1 | T2
    const combined = _.map(schema.oneOf, complexTypeGetter);
    return checkAndAddNull(schema, combined.join(" | "));
  },
  allOf: (schema) => {
    // T1 & T2
    return checkAndAddNull(schema, _.map(schema.allOf, complexTypeGetter).join(" & "));
  },
  anyOf: (schema) => {
    // T1 | T2 | (T1 & T2)
    const combined = _.map(schema.anyOf, complexTypeGetter);
    const nonEmptyTypesCombined = combined.filter((type) => !jsEmptyTypes.includes(type));
    return checkAndAddNull(
      schema,
      `${combined.join(" | ")}` +
        (nonEmptyTypesCombined.length > 1 ? ` | (${nonEmptyTypesCombined.join(" & ")})` : ""),
    );
  },
*/
