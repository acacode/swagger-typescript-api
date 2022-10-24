const _ = require("lodash");

const objectAssign = (target, updaterFn) => {
  if (!updaterFn) return;
  const updated = typeof updaterFn === "function" ? updaterFn(target) : updaterFn;
  Object.assign(target, _.merge(target, updated));
};

module.exports = {
  objectAssign,
};
