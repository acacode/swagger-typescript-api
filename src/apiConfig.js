const _ = require("lodash");
const { formatDescription } = require("./common");

const createApiConfig = ({ info, servers }) => {
  const server = (servers && servers[0]) || { url: "" };

  const generic = _.compact([
    {
      name: "SecurityDataType",
      defaultValue: "any",
    },
  ]);

  const description = _.compact([
    `@title ${info.title || "Api"}`,
    info.version && `@version ${info.version}`,
    server.url && `@baseUrl ${server.url}`,
    _.replace(formatDescription(info.description), /\n/g, "\n * "),
  ]);

  return {
    props: [
      {
        name: "baseUrl",
        optional: true,
        type: "string",
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
    ].filter(Boolean),
    generic,
    baseUrl: server.url,
    title: info.title,
    version: info.version,
    description,
    hasDescription: !!description.length,
  };
};

module.exports = {
  createApiConfig,
};
