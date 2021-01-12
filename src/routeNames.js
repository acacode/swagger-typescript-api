const { config } = require("./config");
const { renderTemplate } = require("./templates");

const getRouteName = (routeInfo) => {
  const { moduleName } = routeInfo;
  const { routeNameDuplicatesMap, templatesToRender } = config;
  const routeNameTemplate = templatesToRender.routeName;

  const routeName = routeNameTemplate
    ? renderTemplate(routeNameTemplate, {
        routeInfo: routeInfo,
        utils: require("./render/utils"),
      })
    : null;

  const duplicateIdentifier = `${moduleName}|${routeName}`;

  if (routeNameDuplicatesMap.has(duplicateIdentifier)) {
    routeNameDuplicatesMap.set(
      duplicateIdentifier,
      routeNameDuplicatesMap.get(duplicateIdentifier) + 1,
    );
    console.warn(
      `🥵  Module "${moduleName}" already have method "${routeName}()"`,
      `\n🥵  This method has been renamed to "${
        routeName + routeNameDuplicatesMap.get(duplicateIdentifier)
      }()" to solve conflict names.`,
    );
  } else {
    routeNameDuplicatesMap.set(duplicateIdentifier, 1);
  }

  const duplicates = routeNameDuplicatesMap.get(duplicateIdentifier);

  return {
    usage: routeName + (duplicates > 1 ? duplicates : ""),
    original: routeName,
    duplicate: duplicates > 1,
  };
};

module.exports = {
  getRouteName,
};
