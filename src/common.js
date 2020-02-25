const _ = require("lodash");

module.exports = {
  prettifyDescription: (description, inline) => {
    let prettified = description;

    prettified = _.replace(prettified, /\*\//g, "*\/")

    if (inline && _.includes(prettified, '\n')) {
      prettified = _(prettified).split(/\n/g)
        .map(part => _.trim(part))
        .compact()
        .join(' ')
        .valueOf()
    }

    return prettified;
  }
}