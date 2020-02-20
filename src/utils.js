const _ = require("lodash")

// its filter and reduce together :)
const collect = (objectOrArray, cb) =>
  _.reduce(objectOrArray, (acc, part, key) => {
    const result = cb(part, key);

    return _.isArray(objectOrArray) ?
      (result ? [ ...acc, result ] : acc) :
      (result ? { ...acc, [key]: result } : acc)
  }, _.isArray(objectOrArray) ? [] : {})

module.exports = {
  collect,
}