const _ = require('lodash');

const CONTENT_KEYWORD = '__CONTENT__';

const contentWrapersByTypeIdentifier = {
  'enum': `{\r\n${CONTENT_KEYWORD} \r\n }`,
  'interface': `{\r\n${CONTENT_KEYWORD}}`,
  'type': `= ${CONTENT_KEYWORD}`,
}

const extraContentFormattersByType = {
  'enum': content => _.map(content, ({ key, value }) => `  ${key} = ${value}`).join(',\n'),
  'intEnum': content => _.map(content, ({ value }) => value).join(' | '),
  'object': content => _.map(content, contentPart => `  ${contentPart}\n`).join('')
}

// { typeIdentifier, name, content, type }
const getModelType = ({ typeIdentifier, name, content, type }) => {
  if (!contentWrapersByTypeIdentifier[typeIdentifier]) {
    throw new Error(`${typeIdentifier} - type identifier is unknown for this utility`)
  }

  const resultContent = extraContentFormattersByType[type] ? extraContentFormattersByType[type](content) : content;

  return {
    typeIdentifier,
    name,
    rawContent: resultContent,
    content: _.replace(contentWrapersByTypeIdentifier[typeIdentifier], CONTENT_KEYWORD, resultContent)
  }
}


module.exports = {
  getModelType,
}