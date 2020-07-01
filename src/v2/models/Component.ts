import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { RefWorker } from "../services/RefWorker";
import { fixRefName } from "../transformers/schema/fixRefName";

export type ComponentRawType = ValueOf<ValueOf<OpenAPIV3.ComponentsObject>>;

const RefMap = new Map<string, Component<ComponentRawType>>();

export abstract class Component<T extends ComponentRawType> {
  protected referencesCount = 0;
  /** original reference name */
  public $ref: string = null;
  /** fixed reference name  */
  public $refName: string = null;
  /** not infered schema type. can be reference */
  public $value: T | OpenAPIV3.ReferenceObject;
  /** infered schema type */
  public value: T;
  constructor($value: T | OpenAPIV3.ReferenceObject) {
    this.$value = $value;
    if (RefWorker.isReferenceObject(this.$value) && RefMap.has(this.$value.$ref)) {
      const ref = RefMap.get(this.$value.$ref);
      ref.referencesCount += 1;
      RefMap.set(this.$value.$ref, ref);
      Object.assign(this, ref);
      if (this.referencesCount <= 1) {
        this.initialize();
      }
      return;
    }

    if ($value) {
      this.value = RefWorker.extract<T>(this.$value);
      if (RefWorker.isReferenceObject(this.$value)) {
        this.$refName = fixRefName(RefWorker.getRefName(this.$value.$ref));
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

  get exist() {
    return !!this.value;
  }

  protected abstract initialize(): void;
}

export function fromRecord<
  G extends unknown,
  V extends ComponentRawType,
  T extends new (...args: unknown[]) => G
>(Component: T, record: Record<string, V>) {
  const componentRecord: Record<string, InstanceType<T>> = {};
  _.each(record, (recordPart, recordPartKey) => {
    componentRecord[recordPartKey] = new Component(recordPart, recordPartKey) as InstanceType<T>;
  });
  return componentRecord;
}

export function fromArray<
  G extends unknown,
  V extends ComponentRawType,
  T extends new (...args: unknown[]) => G
>(Component: T, array: V[]) {
  const components: InstanceType<T>[] = [];
  _.forEach(array, (arrayPart) => {
    components.push(new Component(arrayPart) as InstanceType<T>);
  });
  return components;
}
