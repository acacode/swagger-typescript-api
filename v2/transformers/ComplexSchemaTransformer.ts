import * as _ from "lodash";
import { SchemaContainer } from "../models/components/SchemaContainer";
import { SchemaTransformer, TransformOptions } from "./SchemaTransformer";
import { checkAndAddNull } from "./schema/checkAndAddNull";

export class ComplexSchemaTransformer extends SchemaTransformer {
  transform({ inline }: TransformOptions) {
    const { oneOf, anyOf, allOf, not, $refName } = this.schema;

    if (inline && $refName) {
      return checkAndAddNull(this.schema, this.schema.$refName);
    }

    if (oneOf) {
      return this.transformOneOf(oneOf);
    }

    if (anyOf) {
      return this.transformAnyOf(anyOf);
    }

    if (allOf) {
      return this.transformAllOf(allOf);
    }

    // TODO:
    if (not) {
      // TODO:
      return "";
    }

    return "";
    // if (this.schema.)
  }

  // T1 | T2
  private transformOneOf(oneOf: SchemaContainer[]) {
    const transformers = _.compact(
      _.uniq(_.map(oneOf, (schema) => schema.transform({ inline: true, excludeAny: true }))),
    );
    return transformers.join(" | ");
  }

  // T1 | T2 | (T1 & T2)
  private transformAnyOf(anyOf: SchemaContainer[]) {
    const oneOfCase = this.transformOneOf(anyOf);
    const allOfCase = this.transformOneOf(anyOf);
    return `${oneOfCase || ""}${allOfCase ? `${oneOfCase ? " | " : ""}(${allOfCase})` : ""}`;
  }

  // T1 & T2
  private transformAllOf(allOf: SchemaContainer[]) {
    const transformers = _.compact(
      _.uniq(_.map(allOf, (schema) => schema.transform({ inline: true, excludeAny: true }))),
    );
    return transformers.join(" & ");
  }
}
