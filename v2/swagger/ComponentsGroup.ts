import * as _ from "lodash";
import { fromRecord, ComponentRawType, fromArray, Component } from "./Component";
import { OpenAPIV3 } from "openapi-types";
import { SchemaContainer } from "./components/SchemaContainer";
import { EXTRA_TYPES } from "../transformers/utils/getPrimitiveType";
import { TransformOptions } from "../transformers/SchemaTransformer";

export type ComponentRawGroup<T extends ComponentRawType> = Record<
  string,
  OpenAPIV3.ReferenceObject | T
>;

export abstract class ComponentsGroup<T extends ComponentRawType, C extends Component<T>> {
  group: Record<string, C>;

  constructor(rawGroup: ComponentRawGroup<T>, constructor: new (...args: unknown[]) => C) {
    this.group = fromRecord(constructor, rawGroup);
  }

  protected filter(filter: (value: C, key: string) => boolean) {
    return this.toEntries()
      .filter(([key, value]) => filter(value, key))
      .map(([, value]) => value);
  }

  protected some(callbackfn: (value: C, key: string) => boolean) {
    return this.toEntries().some(([key, value]) => callbackfn(value, key));
  }

  toArray() {
    return this.toEntries().map((entry) => entry[1]);
  }

  toEntries() {
    return Object.entries(this.group);
  }

  map<V>(callbackfn: (value: C, key: string) => V) {
    return this.toEntries().map(([key, value]) => callbackfn(value, key));
  }

  get length() {
    return Object.keys(this.group).length;
  }

  protected transform(schemas: SchemaContainer[], options?: TransformOptions) {
    if (_.compact(schemas).length) {
      const schema = new SchemaContainer({
        oneOf: _.compact(schemas).map((schema) => schema.$value),
        type: "object",
      });

      return schema.transform(options);
    }

    return EXTRA_TYPES.VOID;
  }
}
