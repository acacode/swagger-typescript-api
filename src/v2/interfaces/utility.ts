// for getting constructor arguments from abstract class
export type AbstractContructorParameters<T> = ConstructorParameters<
  (new (...args: any) => { [x: string]: any }) & T
>;
