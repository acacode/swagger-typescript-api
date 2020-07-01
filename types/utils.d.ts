type ValueOf<T> = T[keyof T];

type OmitValue<T, Type> = Pick<
  T,
  {
    [Key in keyof T]-?: T[Key] extends Type ? never : Key;
  }[keyof T]
>;

type PickValue<T, Type> = Pick<
  T,
  {
    [Key in keyof T]-?: T[Key] extends Type ? Key : never;
  }[keyof T]
>;
