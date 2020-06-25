import { fromRecord, ComponentRawType, fromArray, Component } from "./Component";
import { OpenAPIV3 } from "openapi-types";

export type ComponentRawGroup<T extends ComponentRawType> = Record<
  string,
  OpenAPIV3.ReferenceObject | T
>;

export abstract class ComponentsGroup<T extends ComponentRawType, C extends Component<T>> {
  group: Record<string, C>;

  constructor(rawGroup: ComponentRawGroup<T>, constructor: new (...args: unknown[]) => C) {
    this.group = fromRecord(constructor, rawGroup);
  }

  get entries() {
    return Object.entries(this.group);
  }

  get array() {
    return this.entries.map((entry) => entry[1]);
  }

  filter(filter: (key: string, value: C) => boolean) {
    return this.entries.filter(([key, value]) => filter(key, value)).map(([, value]) => value);
  }
}
