const _ = require("lodash");
const { formatDescription } = require("./common");

const createApiConfig = ({ info, servers }) => {
  const server = (servers && servers[0]) || { url: "" };

  const generic = _.compact(["SecurityDataType"]).join(", ");

  const description = _.compact([
    `@title ${info.title || "Api"}`,
    info.version && `@version ${info.version}`,
    formatDescription(info.description),
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
    generic: generic && `<${generic}>`,
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
