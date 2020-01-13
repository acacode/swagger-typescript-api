const _ = require('lodash');

const contentKeyword = '__CONTENT__'
const contentWrapersByType = {
  'enum': `{\r\n${contentKeyword} \r\n }`,
  'interface': `{\r\n${contentKeyword}}`,
  'type': ` = ${contentKeyword}`,
}

const extraContentFormatters = {
  'enum': content => _.map(content, ({ key, value }) => `  ${key} = ${value}`).join(',\n'),
  'object': content => _.map(content, contentPart => `  ${contentPart}\n`).join('')
}

// { typeIdentifier, name, content, type }
const getModelType = ({ typeIdentifier, name, content, type }) => {
  if (!contentWrapersByType[typeIdentifier]) {
    throw new Error(`${typeIdentifier} - type identifier is unknown for this utility`)
  }

  const resultContent = extraContentFormatters[type] ? extraContentFormatters[type](content) : content;

  return {
    typeIdentifier,
    name,
    rawContent: resultContent,
    content: _.replace(contentWrapersByType[typeIdentifier], contentKeyword, resultContent)
  }
}


module.exports = {
  getModelType,
}