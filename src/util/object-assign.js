import * as lodash from "lodash";

const objectAssign = (target, updaterFn) => {
  if (!updaterFn) return;
  const update =
    typeof updaterFn === "function" ? updaterFn(target) : updaterFn;
  const undefinedKeys = lodash
    .map(update, (value, key) => value === undefined && key)
    .filter(Boolean);
  Object.assign(target, lodash.merge(target, update));
  undefinedKeys.forEach((key) => {
    target[key] = undefined;
  });
};

export { objectAssign };
