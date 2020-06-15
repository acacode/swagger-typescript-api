type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

type ValueOf<T> = T[keyof T];

type KeyofType<Base, Type> = ValueOf<FilterFlags<Base, Type>>;

type OmitByType<Base, Type> = Omit<Base, KeyofType<Base, Type>>;
