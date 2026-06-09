import { typeGuard } from "yummies/type-guard";
import type { AnyObject, Maybe } from "yummies/types";
import type { SchemaComponent } from "../types/index.js";
import type { CodeGenConfig } from "./configuration.js";
import type { RefDetails } from "./resolved-swagger-schema.js";
import { pascalCase } from "./util/pascal-case.js";

const OPENAPI_COMPONENT_NAMES = new Set<string>([
  "schemas",
  "responses",
  "requestBodies",
  "parameters",
  "headers",
  "securitySchemes",
  "links",
  "callbacks",
  "examples",
  "pathItems",
]);

export class SchemaComponentsMap {
  _data: SchemaComponent[] = [];

  constructor(public config: CodeGenConfig) {}

  clear() {
    this._data = [];
  }

  createRef = (paths: string[]) => {
    if (!Array.isArray(paths)) {
      throw new Error(`Expected an array, but received: ${typeof paths}`);
    }
    if (paths.length === 0) {
      throw new Error("Paths array cannot be empty.");
    }
    return ["#", ...paths].join("/");
  };

  parseRef = (ref: string) => {
    if (!ref.startsWith("#/")) {
      throw new Error(`Invalid ref format: ${ref}. It should start with "#/"`);
    }
    return ref.split("/");
  };

  private getByLocalFragmentRef($ref: string): Maybe<SchemaComponent> {
    if (!$ref.startsWith("#")) {
      return null;
    }

    const [, rawFragment = ""] = $ref.split("#");
    const fragment = rawFragment.startsWith("/")
      ? rawFragment.slice(1)
      : rawFragment;

    if (!fragment || fragment.includes("/")) {
      return null;
    }

    let fragmentName = fragment;
    try {
      fragmentName = decodeURIComponent(fragment);
    } catch {
      // Keep the raw fragment if it is not URI-encoded.
    }

    const matchingComponents = this._data.filter((component) => {
      if (!component.$ref.startsWith("#")) return false;

      const [, rawPointer = ""] = component.$ref.split("#");
      const pointer = rawPointer.startsWith("/")
        ? rawPointer.slice(1)
        : rawPointer;
      const componentName = pointer.split("/").filter(Boolean).at(-1);

      return (
        component.typeName === fragmentName || componentName === fragmentName
      );
    });

    return matchingComponents.length === 1 ? matchingComponents[0] : null;
  }

  private normalizeTypeNameFromFile(typeName: string): string {
    return typeName.replace(/\.(yaml|yml|json)$/i, "");
  }

  private resolveComponentName(
    rawComponentName: string,
  ): SchemaComponent["componentName"] {
    const normalizedComponentName =
      rawComponentName === "definitions" ? "schemas" : rawComponentName;

    return OPENAPI_COMPONENT_NAMES.has(
      normalizedComponentName as SchemaComponent["componentName"],
    )
      ? (normalizedComponentName as SchemaComponent["componentName"])
      : "schemas";
  }

  private isFileOnlyRef(ref: string): boolean {
    const [, rawPointer = ""] = ref.split("#");
    return !rawPointer.replace(/^\/+/, "");
  }

  private unwrapExternalComponentsDocument(
    ref: string,
    resolved: AnyObject,
  ): { ref: string; resolved: AnyObject } | null {
    if (!this.isFileOnlyRef(ref)) {
      return null;
    }

    const schemas = resolved.components?.schemas;
    if (!schemas || typeof schemas !== "object") {
      return null;
    }

    const schemaEntries = Object.entries(schemas).filter(
      ([, schemaData]) => schemaData != null && typeof schemaData === "object",
    );

    if (schemaEntries.length !== 1) {
      return null;
    }

    const [schemaName, schemaData] = schemaEntries[0];

    return {
      ref: `${ref}#/components/schemas/${schemaName}`,
      resolved: schemaData as AnyObject,
    };
  }

  private isRefOnlyRawTypeData(
    rawTypeData: SchemaComponent["rawTypeData"],
  ): boolean {
    if (!rawTypeData || typeof rawTypeData !== "object") {
      return false;
    }

    return (
      Object.keys(rawTypeData).length === 1 &&
      typeof rawTypeData.$ref === "string"
    );
  }

  private extractComponentSchemaNameFromRef(ref: string): string | null {
    const [, rawPointer = ""] = ref.split("#");
    if (!rawPointer) {
      return null;
    }

    const pointer = rawPointer.startsWith("/")
      ? rawPointer.slice(1)
      : rawPointer;
    const pointerParts = pointer.split("/").filter(Boolean);

    if (pointerParts.length < 2) {
      return null;
    }

    const collection = pointerParts.at(-2);
    if (collection !== "schemas" && collection !== "definitions") {
      return null;
    }

    return this.normalizeTypeNameFromFile(pointerParts.at(-1) || "");
  }

  private findExistingComponentBySchemaFragment(
    ref: string,
    typeName: string,
  ): Maybe<SchemaComponent> {
    const fragmentSchemaName = this.extractComponentSchemaNameFromRef(ref);
    if (!fragmentSchemaName || fragmentSchemaName !== typeName) {
      return null;
    }

    const localRef = this.createRef(["components", "schemas", typeName]);
    const byLocalRef = this._data.find(
      (component) => component.$ref === localRef,
    );
    if (byLocalRef) {
      return byLocalRef;
    }

    const matching = this._data.filter(
      (component) => component.typeName === typeName,
    );

    return matching.length === 1 ? matching[0] : null;
  }

  private preferExistingSchemaNameForExternalRef(
    typeName: string,
    refDetails: RefDetails,
  ): boolean {
    if (!this.config.preferExistingSchemaNamesForExternalRefs) {
      return false;
    }

    const filePrefix = pascalCase(
      refDetails.externalOpenapiFileName || "External",
    );
    if (filePrefix === typeName) {
      return true;
    }

    return (
      this.findExistingComponentBySchemaFragment(refDetails.ref, typeName) !=
      null
    );
  }

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
    const [, rawPointer = ""] = $ref.split("#");
    const pointer = rawPointer.startsWith("/") ? rawPointer : `/${rawPointer}`;
    const pointerParts = pointer.split("/").filter(Boolean);

    const typeName = this.normalizeTypeNameFromFile(
      pointerParts.at(-1) || parsed.at(-1) || "Unknown",
    );
    const rawComponentName =
      pointerParts.at(-2) || parsed[parsed.length - 2] || "schemas";
    const componentName = this.resolveComponentName(rawComponentName);

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

  getComponents = () => {
    return this._data;
  };

  filter(...componentNames: (string[] | string)[]) {
    return this._data.filter((it) =>
      componentNames.some((componentName) =>
        it.$ref.startsWith(`#/components/${componentName}`),
      ),
    );
  }

  resolveRefOnlyComponents() {
    if (!this.config.preferExistingSchemaNamesForExternalRefs) {
      return;
    }

    const { resolvedSwaggerSchema } = this.config;

    for (const component of this._data) {
      if (!this.isRefOnlyRawTypeData(component.rawTypeData)) {
        continue;
      }

      const ref = component.rawTypeData?.$ref;
      if (typeof ref !== "string") {
        continue;
      }

      const resolved = resolvedSwaggerSchema.getRef(ref);
      if (resolved == null || typeof resolved !== "object") {
        continue;
      }

      component.rawTypeData = resolved as AnyObject;
      component.typeData = null;
      delete component.$prepared;
    }
  }

  get = ($ref: string) => {
    const localFound =
      this._data.find((c) => c.$ref === $ref) ||
      this.getByLocalFragmentRef($ref) ||
      null;

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
      let resolvedRef = $ref;
      let resolvedTypeData = foundByRef as AnyObject;

      const unwrappedComponentsDocument = this.unwrapExternalComponentsDocument(
        $ref,
        resolvedTypeData,
      );
      if (unwrappedComponentsDocument) {
        resolvedRef = unwrappedComponentsDocument.ref;
        resolvedTypeData = unwrappedComponentsDocument.resolved;
      }

      const componentDraft = this.createComponentDraft(
        resolvedRef,
        resolvedTypeData,
      );

      componentDraft.typeName =
        this.config.hooks.onFormatExternalTypeName?.(
          componentDraft.typeName,
          refDetails,
        ) || componentDraft.typeName;

      if (this.config.preferExistingSchemaNamesForExternalRefs) {
        const existingByFragment = this.findExistingComponentBySchemaFragment(
          refDetails.ref,
          componentDraft.typeName,
        );
        if (existingByFragment) {
          return existingByFragment;
        }
      }

      if (
        // duplicate name
        this._data.some(
          (component) => component.typeName === componentDraft.typeName,
        )
      ) {
        if (
          this.preferExistingSchemaNameForExternalRef(
            componentDraft.typeName,
            refDetails,
          )
        ) {
          const existingComponent =
            this.findExistingComponentBySchemaFragment(
              refDetails.ref,
              componentDraft.typeName,
            ) ??
            this._data.find(
              (component) => component.typeName === componentDraft.typeName,
            );
          if (existingComponent) {
            return existingComponent;
          }
        }

        componentDraft.typeName =
          this.config.hooks.onFixDuplicateExternalTypeName?.(
            componentDraft.typeName,
            refDetails,
            this._data.map((it) => it.typeName),
          ) ??
          `${pascalCase(refDetails.externalOpenapiFileName || "External")}${componentDraft.typeName}`;
      }

      const existingComponent = this._data.find(
        (component) =>
          component.componentName === componentDraft.componentName &&
          component.typeName === componentDraft.typeName,
      );
      if (existingComponent) {
        return existingComponent;
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
