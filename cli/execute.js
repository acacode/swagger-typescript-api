const _ = require("lodash");
const { root_command, skip_command } = require("./constants");
const { parseArgs } = require("./parse-args");
const didYouMean = require("didyoumean");

didYouMean.threshold = 0.5;

const execute = (params, commands, instance) => {
  const args = parseArgs(params.args, params.from);

  return new Promise((resolve, reject) => {
    const { command, usageOptions, error } = processArgs(commands, args);

    if (error) {
      reject(new Error(error));
      return;
    }

    if (!usageOptions.length && command.name === root_command) {
      usageOptions.push(command.options.find((option) => option.flags.name === "help"));
    }

    const operationOptions = usageOptions.filter((option) => option.operation);
    if (operationOptions.length) {
      operationOptions[0].operation();
      resolve({
        command: skip_command,
        options: {},
      });
      return;
    } else {
      let error = "";

      const processUserOptionData = (data, option) => {
        if (!data.length && !option.flags.value) {
          return !option.flags.isNoFlag;
        }
        if (option.flags.value) {
          if (option.flags.value.variadic) {
            return data.reduce((acc, d) => {
              acc.push(...d.split(",").map(option.flags.value.formatter));
              return acc;
            }, []);
          } else {
            return option.flags.value.formatter(data[0] || option.default);
          }
        }

        return option.default;
      };

      const parsedOptionsObject = command.options.reduce((acc, option) => {
        if (error) return acc;

        const userOption = usageOptions.find((o) => o.flags.name === option.flags.name);

        if (!userOption && option.required) {
          error = `required option '${option.flags.raw}' not specified`;
          return acc;
        }

        if (userOption) {
          acc[option.flags.name] = processUserOptionData(userOption.$data, option);
        } else {
          acc[option.flags.name] = option.default;
        }

        return acc;
      }, {});

      if (error) {
        reject(new Error(error));
      } else {
        resolve({
          command: command.name === root_command ? null : command.name,
          options: parsedOptionsObject,
        });
      }
    }
  });
};

const processArgs = (commands, args) => {
  let command = null;
  let usageOptions = [];
  let walkingOption = null;
  let error = "";

  let allFlagKeys = [];

  _.forEach(args, (arg, i) => {
    if (error) return;

    if (i === 0) {
      command = commands[arg];

      if (!command && !arg.startsWith("-")) {
        const tip = didYouMean(arg, _.keys(commands));
        error = `unknown command ${arg}${tip ? `\n(Did you mean ${tip} ?)` : ""}`;
      } else if (!command) {
        command = commands[root_command];
      }

      if (command) {
        allFlagKeys = command.options.reduce((acc, option) => [...acc, ...option.flags.keys], []);
      }
    }

    if (error) return;

    if (arg.startsWith("-")) {
      const option = command.options.find((option) => option.flags.keys.includes(arg));

      if (!option) {
        const tip = didYouMean(arg, allFlagKeys);
        error = `unknown option ${arg}${tip ? `\n(Did you mean ${tip} ?)` : ""}`;
      }

      if (option) {
        if (walkingOption && walkingOption.flags.name === option.flags.name) {
          return;
        }
        const existedOption = usageOptions.find((o) => o.flags.name === option.flags.name);
        if (existedOption) {
          walkingOption = existedOption;
        } else {
          walkingOption = {
            ...option,
            $data: [],
          };
          usageOptions.push(walkingOption);
        }
      }

      return;
    }

    if (walkingOption) {
      walkingOption.$data.push(arg);
    }
  });
  command = command || commands[root_command];

  if (error) {
    return {
      command: null,
      usageOptions: [],
      error,
    };
  }

  return {
    command,
    usageOptions,
    error,
  };
};

module.exports = {
  execute,
};
