import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { SchemaContainer } from "./SchemaContainer";
import { ExampleContainer } from "./ExampleContainer";
import { EncodingContainer } from "./EncodingContainer";
import { fromRecord } from "../Component";

export class MediaTypeContainer {
  schema: SchemaContainer;
  examples: Record<string, ExampleContainer>;
  encoding: Record<string, EncodingContainer>;

  constructor(public $value: OpenAPIV3.MediaTypeObject) {
    this.schema = new SchemaContainer(this.$value.schema);
    this.examples = fromRecord(ExampleContainer, this.$value.examples);
    this.encoding = fromRecord(EncodingContainer, this.$value.encoding);
  }
}
