import { SchemaContainer, SchemaKind } from "../models/components/SchemaContainer";
import { OpenAPIV3 } from "openapi-types";
import { TransformKind } from "./schema/getTransformKind";

const RefMap = new Map<string, string>();

export abstract class SchemaTransformer {
  constructor(protected schema: SchemaContainer, public kind: TransformKind) {
    this.patchTransform();
  }

  abstract transform(inline?: boolean): string;

  patchTransform() {
    const originalTransform = this.transform.bind(this);

    this.transform = (inline?: boolean) => {
      // TODO: рефа не может бтыь иногда
      const refMapKey = `${!!inline}:${this.schema.$ref}`;

      if (this.schema.$ref && RefMap.has(refMapKey)) {
        return RefMap.get(refMapKey);
      }

      const result = originalTransform(inline);
      if (this.schema.$ref) {
        RefMap.set(refMapKey, result);
      }
      return result;
    };
  }
}
