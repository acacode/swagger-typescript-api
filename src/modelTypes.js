const { formatters } = require("./typeFormatters");
const { formatModelName } = require("./modelNames");
const { config } = require("./config");
const { getTypeData } = require("./components");

/**
 *
 * @param {import("./components").TypeInfo} typeInfo
 * @returns
 */
const prepareModelType = (typeInfo) => {
  const rawTypeData = getTypeData(typeInfo);
  const typeData = formatters[rawTypeData.type] ? formatters[rawTypeData.type](rawTypeData) : rawTypeData;
  let { typeIdentifier, name: originalName, content, description } = typeData;
  const name = formatModelName(originalName);

  return {
    ...typeData,
    typeIdentifier,
    name,
    description,
    $content: rawTypeData.content,
    rawContent: rawTypeData.content,
    content: content,
    typeData,
  };
};

module.exports = {
  prepareModelType,
};
