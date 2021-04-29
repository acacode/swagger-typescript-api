const _ = require("lodash");

const createApiConfig = (swaggerSchema) => {
  const { info, servers, host, basePath, externalDocs, tags } = swaggerSchema;
  const server = (servers && servers[0]) || { url: "" };
  const { title = "No title", version, description: schemaDescription = "" } = info || {};
  const { url: serverUrl } = server;

  return {
    info: info || {},
    servers: servers || [],
    basePath,
    host,
    externalDocs: _.merge(
      {
        url: "",
        description: "",
      },
      externalDocs,
    ),
    tags: _.compact(tags),
    baseUrl: serverUrl,
    title,
    version,
  };
};

module.exports = {
  createApiConfig,
};
