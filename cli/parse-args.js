const parseArgs = (args, type) => {
  if (args == null || !Array.isArray(args)) {
    throw "args should be array";
  }
  const argsCopy = args.slice();

  switch (type) {
    case "electron": {
      if (process.defaultApp) {
        return argsCopy.slice(2);
      }

      return argsCopy.slice(1);
    }
    case "user": {
      return argsCopy;
    }
    default: {
      return argsCopy.slice(2);
    }
  }
};

module.exports = {
  parseArgs,
};
