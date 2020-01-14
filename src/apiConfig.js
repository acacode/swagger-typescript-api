const createApiConfig = ({ info, servers, }, hasSecurityRoutes) => {
  const server = (servers && servers[0]) || { url: '' }

  const generic = [
    hasSecurityRoutes && 'SecurityDataType'
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
        type: 'ApiParams'
      },
      hasSecurityRoutes && {
        name: 'securityWorker',
        optional: true,
        type: '(securityData: SecurityDataType) => ApiParams'
      }
    ].filter(Boolean),
    generic: generic && `<${generic}>`,
    baseUrl: server.url,
    title: info.title,
    version: info.version,
  }
}

module.exports = {
  createApiConfig,
}