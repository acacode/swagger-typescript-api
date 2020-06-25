import * as _ from "lodash";

export const formatDescription = (description?: string, inline?: boolean) => {
  if (!description) return "";

  let prettified = description;

  prettified = _.replace(prettified, /\*\//g, "*/");

  const hasMultipleLines = _.includes(prettified, "\n");

  if (!hasMultipleLines) return prettified;

  if (inline) {
    return _(prettified)
      .split(/\n/g)
      .map((part) => _.trim(part))
      .compact()
      .join(" ")
      .valueOf();
  }

  // TODO:?
  return _.replace(prettified, /\n/g, "\n * ");
};
