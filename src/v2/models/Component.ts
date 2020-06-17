import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { ValuesType } from "utility-types";
import { RefWorker } from "../services/RefWorker";
import { SchemaContainer } from "./components/SchemaContainer";

const RefMap = new Map<string, Component<ValuesType<ValuesType<OpenAPIV3.ComponentsObject>>>>();

export abstract class Component<T extends ValuesType<ValuesType<OpenAPIV3.ComponentsObject>>> {
  protected referencesCount = 0;
  protected isInstanceRef = false;
  public $ref: string = null;
  public value: T;
  constructor(public $value?: T | OpenAPIV3.ReferenceObject) {
    if (RefWorker.isReferenceObject(this.$value) && RefMap.has(this.$value.$ref)) {
      const ref = RefMap.get(this.$value.$ref);
      ref.referencesCount += 1;
      RefMap.set(this.$value.$ref, ref);
      Object.assign(this, ref);
      this.isInstanceRef = true;
      if (!this.alreadyParsed) {
        this.initialize();
      }
      return;
    }

    if ($value) {
      this.value = RefWorker.extract<T>(this.$value);
      if (RefWorker.isReferenceObject(this.$value)) {
        this.$ref = this.$value.$ref;
        if (!RefMap.has(this.$ref)) {
          RefMap.set(this.$ref, this);
        }
      }
      this.initialize();
    } else {
      this.value = null;
    }
  }

  get alreadyParsed() {
    return this.isInstanceRef && this.referencesCount > 1;
  }

  protected abstract initialize(): void;
  abstract serialize(): string;
}

export function fromRecord<
  G extends unknown,
  V extends ValuesType<ValuesType<OpenAPIV3.ComponentsObject>>,
  T extends new (...args: unknown[]) => G
>(Component: T, record: Record<string, V>) {
  const componentRecord: Record<string, InstanceType<T>> = {};
  _.each(record, (recordPart, recordPartKey) => {
    componentRecord[recordPartKey] = new Component(recordPart) as InstanceType<T>;
  });
  return componentRecord;
}

export function fromArray<
  G extends unknown,
  V extends ValuesType<ValuesType<OpenAPIV3.ComponentsObject>>,
  T extends new (...args: unknown[]) => G
>(Component: T, array: V[]) {
  const components: InstanceType<T>[] = [];
  _.forEach(array, (arrayPart) => {
    components.push(new Component(arrayPart) as InstanceType<T>);
  });
  return components;
}
