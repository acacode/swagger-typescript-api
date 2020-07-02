import { fromRecord, ComponentRawType, fromArray, Component } from "./Component";

export abstract class ComponentsList<T extends ComponentRawType, C extends Component<T>> {
  value: C[];

  constructor(rawValue: T[], constructor: new (...args: unknown[]) => C) {
    this.value = fromArray(constructor, rawValue);
  }
}
