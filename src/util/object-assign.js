const _ = require("lodash");

const objectAssign = (target, updaterFn) => {
  if (!updaterFn) return;
  const update = typeof updaterFn === "function" ? updaterFn(target) : updaterFn;
  const undefinedKeys = _.map(update, (value, key) => value === undefined && key).filter(Boolean);
  Object.assign(target, _.merge(target, update));
  undefinedKeys.forEach((key) => {
    target[key] = undefined;
  });
};

module.exports = {
  objectAssign,
};
