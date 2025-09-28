import { typeGuard } from "yummies/type-guard";
import type { AnyObject, Maybe } from "yummies/utils/types";
import type { SchemaComponent } from "../types/index.js";
import type { CodeGenConfig } from "./configuration.js";
import { pascalCase } from "./util/pascal-case.js";

export class SchemaComponentsMap {
  _data: SchemaComponent[] = [];

  constructor(public config: CodeGenConfig) {}

  clear() {
    this._data = [];
  }

  createRef = (paths: string[]) => {
    return ["#", ...paths].join("/");
  };

  parseRef = (ref: string) => {
    return ref.split("/");
  };

  private createComponentDraft(
    $ref: string,
    rawTypeData: Maybe<AnyObject> | SchemaComponent,
  ): SchemaComponent {
    if (
      typeGuard.isObject(rawTypeData) &&
      rawTypeData.typeName &&
      rawTypeData.rawTypeData &&
      rawTypeData.$ref
    ) {
      return rawTypeData as SchemaComponent;
    }

    const parsed = this.parseRef($ref);
    const typeName = parsed.at(-1)!;
    const componentName = parsed[
      parsed.length - 2
    ] as SchemaComponent["componentName"];

    return {
      $ref,
      typeName,
      rawTypeData: rawTypeData as SchemaComponent["rawTypeData"],
      componentName,
      /** result from schema parser */
      typeData: null,
    };
  }

  createComponent(
    $ref: string,
    rawTypeData: SchemaComponent["rawTypeData"] | SchemaComponent,
    addAtStart?: boolean,
  ): SchemaComponent {
    const componentSchema = this.createComponentDraft($ref, rawTypeData);
    const usageComponent =
      this.config.hooks.onCreateComponent(componentSchema) || componentSchema;

    const refIndex = this._data.findIndex((c) => c.$ref === $ref);

    if (refIndex === -1) {
      if (addAtStart) {
        this._data.unshift(usageComponent);
      } else {
        this._data.push(usageComponent);
      }
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
    const localFound = this._data.find((c) => c.$ref === $ref) || null;

    if (localFound != null) {
      return localFound;
    }

    const { resolvedSwaggerSchema } = this.config;

    if (resolvedSwaggerSchema.isLocalRef($ref)) {
      return null;
    }

    const foundByRef = resolvedSwaggerSchema.getRef($ref);
    const refDetails = resolvedSwaggerSchema.getRefDetails($ref);

    if (foundByRef != null) {
      const componentDraft = this.createComponentDraft(
        $ref,
        foundByRef as AnyObject,
      );

      componentDraft.typeName =
        this.config.hooks.onFormatExternalTypeName?.(
          componentDraft.typeName,
          refDetails,
        ) || componentDraft.typeName;

      if (
        // duplicate name
        this._data.some(
          (component) => component.typeName === componentDraft.typeName,
        )
      ) {
        componentDraft.typeName =
          this.config.hooks.onFixDuplicateExternalTypeName?.(
            componentDraft.typeName,
            refDetails,
            this._data.map((it) => it.typeName),
          ) ??
          `${pascalCase(refDetails.externalOpenapiFileName || "External")}${componentDraft.typeName}`;
      }

      return this.createComponent($ref, componentDraft);
    }

    return null;
  };

  // Ensure enums are at the top of components list
  enumsFirst() {
    this._data.sort((a, b) => {
      if (Object.keys(a.rawTypeData || {}).includes("enum")) return -1;
      if (Object.keys(b.rawTypeData || {}).includes("enum")) return 1;
      return 0;
    });
  }

  // Ensure discriminators are at the top of components list
  discriminatorsFirst() {
    this._data.sort((a, b) => {
      if (Object.keys(a.rawTypeData || {}).includes("discriminator")) return -1;
      if (Object.keys(b.rawTypeData || {}).includes("discriminator")) return 1;
      return 0;
    });
  }
}
