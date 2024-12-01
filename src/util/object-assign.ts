import lodash from "lodash";

type Updater = (target: unknown) => unknown;

export const objectAssign = (target: object, updater: Updater | unknown) => {
  if (!updater) return;
  const update = typeof updater === "function" ? updater(target) : updater;
  const undefinedKeys = lodash
    .map(update, (value, key) => value === undefined && key)
    .filter((key) => typeof key === "string");
  Object.assign(target, lodash.merge(target, update));
  for (const key of undefinedKeys) {
    target[key] = undefined;
  }
};
