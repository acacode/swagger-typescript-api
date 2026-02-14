import { merge } from "es-toolkit";

type Updater = (target: unknown) => unknown;

export const objectAssign = (target: object, updater: Updater | unknown) => {
  if (!updater) return;
  const update = (
    typeof updater === "function" ? updater(target) : updater
  ) as Record<string, unknown>;
  const undefinedKeys = Object.entries(update)
    .filter(([, value]) => value === undefined)
    .map(([key]) => key);
  merge(target, update);
  for (const key of undefinedKeys) {
    (target as Record<string, unknown>)[key] = undefined;
  }
};
