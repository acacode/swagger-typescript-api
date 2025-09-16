import type { SchemaComponent } from "../types/index.js";
import type { CodeGenConfig } from "./configuration.js";

export class SchemaComponentsMap {
  _data: SchemaComponent[] = [];
  config: CodeGenConfig;

  constructor(config: CodeGenConfig) {
    this.config = config;
  }

  clear() {
    this._data = [];
  }

  createRef = (paths: string[]) => {
    return ["#", ...paths].join("/");
  };

  parseRef = (ref: string) => {
    return ref.split("/");
  };

  createComponent(
    $ref: string,
    rawTypeData: SchemaComponent["rawTypeData"],
  ): SchemaComponent {
    const parsed = this.parseRef($ref);
    const typeName = parsed[parsed.length - 1]!;
    const componentName = parsed[
      parsed.length - 2
    ] as SchemaComponent["componentName"];
    const componentSchema: SchemaComponent = {
      $ref,
      typeName,
      rawTypeData,
      componentName,
      /** result from schema parser */
      typeData: null,
    };

    const usageComponent =
      this.config.hooks.onCreateComponent(componentSchema) || componentSchema;

    const refIndex = this._data.findIndex((c) => c.$ref === $ref);

    if (refIndex === -1) {
      this._data.push(usageComponent);
    } else {
      this._data[refIndex] = usageComponent;
    }

    return usageComponent;
  }

  getComponents() {
    return this._data;
  }

  filter(...componentNames: (string[] | string)[]) {
    return this._data.filter((it) =>
      componentNames.some((componentName) =>
        it.$ref.startsWith(`#/components/${componentName}`),
      ),
    );
  }

  get = ($ref: string) => {
    return this._data.find((c) => c.$ref === $ref) || null;
  };

  // Ensure enums are at the top of components list
  enumsFirst() {
    this._data.sort((a, b) => {
      if (Object.keys(a.rawTypeData || {}).includes("enum")) return -1;
      if (Object.keys(b.rawTypeData || {}).includes("enum")) return 1;
      return 0;
    });
  }
}
