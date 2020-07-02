export type ValueOf<T> = T[keyof T];

export type OmitValue<T, Type> = Pick<
  T,
  {
    [Key in keyof T]-?: T[Key] extends Type ? never : Key;
  }[keyof T]
>;

export type PickValue<T, Type> = Pick<
  T,
  {
    [Key in keyof T]-?: T[Key] extends Type ? Key : never;
  }[keyof T]
>;

// for getting constructor arguments from abstract class
export type AbstractContructorParameters<T> = ConstructorParameters<
  (new (...args: any) => { [x: string]: any }) & T
>;
