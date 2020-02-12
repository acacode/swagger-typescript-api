const _ = require('lodash');
const { formatters } = require("./typeFormatters");

const CONTENT_KEYWORD = '__CONTENT__';

const contentWrapersByTypeIdentifier = {
  'enum': `{\r\n${CONTENT_KEYWORD} \r\n }`,
  'interface': `{\r\n${CONTENT_KEYWORD}}`,
  'type': `: ${CONTENT_KEYWORD}`,
}

// { typeIdentifier, name, content, type }
const getModelType = ({ typeIdentifier, name, content, type, description }) => {
  if (!contentWrapersByTypeIdentifier[typeIdentifier]) {
    throw new Error(`${typeIdentifier} - type identifier is unknown for this utility`)
  }

  const resultContent = formatters[type] ? formatters[type](content) : content;

  return {
    typeIdentifier,
    name,
    rawContent: resultContent,
    description,
    content: _.replace(contentWrapersByTypeIdentifier[typeIdentifier], CONTENT_KEYWORD, resultContent)
  }
}


module.exports = {
  getModelType,
}