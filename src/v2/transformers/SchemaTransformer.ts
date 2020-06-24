import { SchemaContainer, SchemaKind } from "../models/components/SchemaContainer";

const RefMap = new Map<string, string>();

export interface TransformOptions {
  inline?: boolean;
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

  private patchTransform() {
    const originalTransform = this.transform.bind(this);

    this.transform = (options: TransformOptions = {}) => {
      const transformOptions = { ...defaultTransformOptions, ...options };

      const refMapKey = `${!!transformOptions.inline}:${this.schema.$ref}`;

      if (this.schema.$ref && RefMap.has(refMapKey)) {
        return RefMap.get(refMapKey);
      }

      const result = originalTransform(transformOptions);
      if (this.schema.$ref) {
        RefMap.set(refMapKey, result);
      }
      return result;
    };
  }
}
