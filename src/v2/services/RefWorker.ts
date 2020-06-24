import * as _ from "lodash";
import { UsageSchema, schemaIsOpenAPIV3 } from "../interfaces/schema";
import { Configuration } from "./Configuration";
import { OpenAPIV3 } from "openapi-types";

class RefWorkerError extends Error {}

export class RefWorker {
  static find<T = any>($ref: string): T {
    const schema = Configuration.value.usageSchema;

    if (!$ref.startsWith("#")) {
      throw new RefWorkerError(`Bad $ref field value: "${$ref}"`);
    }

    $ref = RefWorker.fixRef($ref);

    const [, ...refParts] = $ref.split("/");
    const foundReference = _.get(schema, refParts);

    if (!foundReference) {
      throw new RefWorkerError(`object schema for the $ref ${$ref} is not exist`);
    }

    return foundReference;
  }

  static extract<T = unknown>(referenceObject: OpenAPIV3.ReferenceObject | T) {
    if (RefWorker.isReferenceObject(referenceObject)) {
      return RefWorker.find<T>(referenceObject.$ref);
    } else {
      return referenceObject;
    }
  }

  static fixRef($ref: string) {
    if ($ref.startsWith("#/definitions/")) {
      return $ref.replace("#/definitions/", "#/components/schemas/");
    }

    return $ref;
  }

  static isReferenceObject(value: any): value is OpenAPIV3.ReferenceObject {
    return value && "$ref" in value;
  }

  static getRefName($ref: string) {
    return _.last(RefWorker.fixRef($ref).split("/"));
  }
}
