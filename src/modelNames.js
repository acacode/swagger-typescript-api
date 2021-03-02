const _ = require("lodash");
const { config } = require("./config");

const isValidName = (name) => /^([A-Za-z$_]{1,})$/g.test(name);

const formattedModelNamesMap = new Map();

const checkAndRenameModelName = (name) => {
  if (typeof name !== "string") {
    if (!config.silent) console.warn("🔨 wrong name of the model name", name, config.silent);

    return name;
  }

  if (formattedModelNamesMap.has(name)) {
    return formattedModelNamesMap.get(name);
  }

  if (/^([A-Z_]{1,})$/g.test(name)) {
    return name;
  }

  if (!isValidName(name)) {
    if (!/^[a-zA-Z_$]/g.test(name)) {
      name = `Type ${name}`;
    }

    // specific replaces for TSOA 3.x
    if (name.includes("."))
      name = name
        .replace(/Exclude_keyof[A-Za-z]{1,}/g, (match) => "ExcludeKeys")
        .replace(/%22\~AND\~%22/g, "And")
        .replace(/%22\~OR\~%22/g, "Or")
        .replace(/(\.?%22)|\./g, "_")
        .replace(/__+$/, "");

    if (name.includes("-")) name = _.startCase(name).replace(/ /g, "");
  }

  const formattedModelName = _.replace(_.startCase(name), /\s/g, "");

  formattedModelNamesMap.set(name, formattedModelName);

  return formattedModelName;
};

module.exports = {
  checkAndRenameModelName,
  isValidName,
};
