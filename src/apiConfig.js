const _ = require("lodash");
const { formatDescription } = require("./common");
const { TS_KEYWORDS } = require("./constants");

const createApiConfig = ({ info, servers }) => {
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
    `@title ${title || "Api"}`,
    version && `@version ${version}`,
    serverUrl && `@baseUrl ${serverUrl}`,
    _.replace(formatDescription(schemaDescription), /\n/g, "\n * "),
  ]);

  return {
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
    generic,
    baseUrl: serverUrl,
    title,
    version,
    description,
    hasDescription: !!description.length,
  };
};

module.exports = {
  createApiConfig,
};
