import { OpenAPIV3 } from "openapi-types";

export class ComponentsContainer {
  constructor(private $components: OpenAPIV3.ComponentsObject) {
    this.$components.responses;
  }
}
