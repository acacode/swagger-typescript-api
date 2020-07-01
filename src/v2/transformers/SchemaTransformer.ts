import { SchemaContainer, SchemaKind } from "../models/components/SchemaContainer";

const RefMap = new Map<string, string>();

export interface TransformOptions {
  /** generate inline code or return type name */
  inline?: boolean;
  /** remove the type "any" from union types or some other types */
  excludeAny?: boolean;
}

const defaultTransformOptions: Required<TransformOptions> = {
  inline: false,
  excludeAny: false,
};

export abstract class SchemaTransformer {
  constructor(protected schema: SchemaContainer) {
    this.patchTransform();
  }

  abstract transform(options: TransformOptions): string;

  private getRefMapKey(options: TransformOptions, schema: SchemaContainer) {
    if (!schema.$ref) return null;

    return [
      options.inline ? "inline" : "not-inline",
      options.excludeAny ? "exclude-any" : "not-exclude-any",
      schema.$ref,
    ].join(":");
  }

  private patchTransform() {
    const originalTransform = this.transform.bind(this);

    this.transform = (transformOptions: TransformOptions = {}) => {
      const options = { ...defaultTransformOptions, ...transformOptions };

      const refMapKey = this.getRefMapKey(options, this.schema);

      if (refMapKey && RefMap.has(refMapKey)) {
        return RefMap.get(refMapKey);
      }

      const result = originalTransform(options);

      if (refMapKey) {
        RefMap.set(refMapKey, (options.inline && this.schema.$refName) || result);
      }
      return result;
    };
  }
}
