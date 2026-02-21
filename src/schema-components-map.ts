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

  /**
   * Partition-based stable reorder that moves items matching `predicate` to the
   * front of `_data` while preserving the relative order of all other items.
   *
   * Unlike `Array.prototype.sort`, this never changes the relative order of
   * components that don't match the predicate, so the spec-defined order of
   * non-promoted types is retained (fixes issue #151).
   */
  private _stablePromoteToFront(
    predicate: (component: SchemaComponent) => boolean,
  ) {
    const promoted: SchemaComponent[] = [];
    const rest: SchemaComponent[] = [];
    for (const component of this._data) {
      if (predicate(component)) {
        promoted.push(component);
      } else {
        rest.push(component);
      }
    }
    this._data = [...promoted, ...rest];
  }

  // Ensure enums are at the top of components list while preserving the
  // relative order of all remaining components (stable reorder, not a sort).
  enumsFirst() {
    this._stablePromoteToFront((c) =>
      Object.keys(c.rawTypeData || {}).includes("enum"),
    );
  }

  // Ensure discriminators are at the top of components list while preserving
  // the relative order of all remaining components (stable reorder, not a sort).
  discriminatorsFirst() {
    this._stablePromoteToFront((c) =>
      Object.keys(c.rawTypeData || {}).includes("discriminator"),
    );
  }
}
