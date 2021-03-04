const { formatters } = require("./typeFormatters");
const { formatModelName } = require("./modelNames");
const { config } = require("./config");
const { getTypeData } = require("./components");

const prepareModelType = (typeInfo) => {
  const typeData = getTypeData(typeInfo);
  let { typeIdentifier, name: originalName, content, type, description } = typeData;

  if (config.generateUnionEnums && typeIdentifier === "enum") {
    typeIdentifier = "type";
  }

  const resultContent = formatters[type] ? formatters[type](content) : content;
  const name = formatModelName(originalName);

  return {
    typeIdentifier,
    name,
    description,
    rawContent: content,
    content: resultContent,
    typeData,
  };
};

module.exports = {
  prepareModelType,
};
