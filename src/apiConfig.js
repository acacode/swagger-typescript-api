const _ = require("lodash")

const createApiConfig = ({ info, servers, }) => {
  const server = (servers && servers[0]) || { url: '' }

  const generic = [
    'SecurityDataType'
  ].filter(Boolean).join(', ')

  return {
    props: [
      {
        name: 'baseUrl',
        optional: true,
        type: 'string'
      },
      {
        name: 'baseApiParams',
        optional: true,
        type: 'RequestParams'
      },
      {
        name: 'securityWorker',
        optional: true,
        type: '(securityData: SecurityDataType) => RequestParams'
      }
    ].filter(Boolean),
    generic: generic && `<${generic}>`,
    baseUrl: server.url,
    title: info.title,
    version: info.version,
    description: _.replace(info.description, /\*\//g, "*\/"),
  }
}

module.exports = {
  createApiConfig,
}