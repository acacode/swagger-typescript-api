const _ = require("lodash");

module.exports = {
  prettifyDescription: (description, inline) => {
    let prettified = description;

    prettified = _.replace(prettified, /\*\//g, "*\/")

    if (inline) {
      prettified = _.replace(prettified, /\n/g, '. ')
    }

    return prettified;
  }
}