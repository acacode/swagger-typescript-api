const _ = require("lodash");
const { formatDescription } = require("./common");
const { TS_KEYWORDS } = require("./constants");

const createApiConfig = (swaggerSchema) => {
  const { info, servers, host, basePath, externalDocs, tags } = swaggerSchema;
  const server = (servers && servers[0]) || { url: "" };
  const { title = "No title", version, description: schemaDescription = "" } = info || {};
  const { url: serverUrl } = server;

  const generic = _.compact([
    {
      name: "SecurityDataType",
      defaultValue: TS_KEYWORDS.ANY,
    },
  ]);

  const description = _.compact([
    `@title ${title || "No title"}`,
    version && `@version ${version}`,
    serverUrl && `@baseUrl ${serverUrl}`,
    _.replace(formatDescription(schemaDescription), /\n/g, "\n * "),
  ]);

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
    // TODO: unused, remove!
    props: _.compact([
      {
        name: "baseUrl",
        optional: true,
        type: TS_KEYWORDS.STRING,
      },
      {
        name: "baseApiParams",
        optional: true,
        type: "RequestParams",
      },
      {
        name: "securityWorker",
        optional: true,
        type: "(securityData: SecurityDataType) => RequestParams",
      },
    ]),
    // TODO: unused in fresh templates, remove in future
    generic,
    baseUrl: serverUrl,
    title,
    version,
    // TODO: unused, remove
    description,
    // TODO: unused, remove
    hasDescription: !!description.length,
  };
};

module.exports = {
  createApiConfig,
};
