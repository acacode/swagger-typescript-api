import _ from "lodash";
import { reservedOptions, root_command } from "./constants.js";
import { execute } from "./execute.js";
import { displayHelp } from "./operations/display-help.js";
import { displayVersion } from "./operations/display-version.js";
import { processOption } from "./process-option.js";

const cli = (input) => {
  const commands = {};

  const addCommand = (command, { addVersion = false, addHelp = true } = {}) => {
    commands[command.name] = {
      name: command.name,
      description: `${command.description || ""}`,
      options: _.compact(_.map(command.options, processOption)),
    };

    if (addVersion) {
      commands[command.name].options.unshift(
        processOption({
          flags: "-v, --version",
          description: "output the current version",
          operation: () => displayVersion(instance),
        }),
      );
    }

    if (addHelp) {
      commands[command.name].options.push(
        processOption({
          flags: "-h, --help",
          description: "display help for command",
          operation: () =>
            displayHelp(commands, instance, commands[command.name]),
        }),
      );
    }

    return instance;
  };

  const instance = {
    commands,
    input,
    addCommand,
    execute: (params) => execute(params, commands, instance),
  };

  addCommand(
    {
      name: root_command,
      options: [],
    },
    {
      addVersion: false,
      addHelp: false,
    },
  );

  _.forEach(input.options, (option) => {
    const processed = processOption(option);

    if (!processed) return;

    if (reservedOptions.includes(processed.name)) {
      console.warn("reserved option", processed.name);
      return;
    }

    commands[root_command].options.push(processed);
  });

  commands[root_command].options.unshift(
    processOption({
      flags: "-v, --version",
      description: "output the current version",
      operation: () => displayVersion(instance),
    }),
  );

  commands[root_command].options.push(
    processOption({
      flags: "-h, --help",
      description: "display help for command",
      operation: () => displayHelp(commands, instance, commands[root_command]),
    }),
  );

  _.forEach(input.commands, addCommand);

  return instance;
};

export { cli };
