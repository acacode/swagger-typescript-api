const _ = require("lodash");

const defineSpecificArgName = (variants, reservedNames) => {
  let usageName = null;

  const uniqVariants = _.uniq(variants);
  const compactReservedNames = _.uniq(_.compact(reservedNames));

  _.forEach(uniqVariants, (variant) => {
    if (!usageName && !_.some(compactReservedNames, (name) => name === variant)) {
      usageName = variant;
    }
  });
  // }

  return usageName || `arg${Math.round(Math.random() * 15)}`;
};

module.exports = {
  defineSpecificArgName,
};
