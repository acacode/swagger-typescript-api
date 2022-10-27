const _ = require("lodash");
const { root_command } = require("../constants");

const generateOptionsOutput = (options) =>
  options.reduce(
    (acc, option) => {
      const flags = `${option.flags.keys.join(", ")}${option.flags.value?.raw ? ` ${option.flags.value?.raw}` : ""}`;
      const description = `${option.description || ""}${
        option.default === undefined || (option.flags.isNoFlag && option.default === true)
          ? ""
          : ` (default: ${typeof option.default === "string" ? `"${option.default}"` : option.default})`
      }`;

      if (flags.length > acc.maxLength) {
        acc.maxLength = flags.length;
      }

      acc.options.push({
        flags,
        description,
      });
      return acc;
    },
    {
      options: [],
      maxLength: 0,
    },
  );

const generateOptionsTextOutput = (options, maxLength, spaces) =>
  options
    .map((option) => {
      const spacesText = Array(spaces).fill(" ").join("");
      const leftStr = `${spacesText}${option.flags.padEnd(maxLength, " ")}  `;
      const leftStrFiller = Array(leftStr.length).fill(" ").join("");
      const descriptionLines = option.description.split("\n");

      return (
        leftStr +
        descriptionLines
          .map((line, i) => {
            if (i === 0) {
              return line;
            }

            return `\n${leftStrFiller}${line}`;
          })
          .join("")
      );
    })
    .join("\n");

const displayAllHelp = (commands, instance) => {
  const { options, maxLength: maxOptionLength } = generateOptionsOutput(commands[root_command].options);

  const { commands: commandLabels, maxLength: maxCommandLength } = _.filter(
    commands,
    (command) => command.name !== root_command,
  ).reduce(
    (acc, command) => {
      const options = generateOptionsOutput(command.options);
      const name = `${command.name}${options.length ? " [options]" : ""}`;
      const description = command.description;

      const maxLength = Math.max(name.length, options.maxLength);
      if (maxLength > acc.maxLength) {
        acc.maxLength = maxLength;
      }

      acc.commands.push({
        description,
        name,
        options,
      });
      return acc;
    },
    {
      commands: [],
      maxLength: maxOptionLength,
    },
  );

  const optionsOutput = generateOptionsTextOutput(options, maxOptionLength, 2);

  const commandsOutput = commandLabels
    .map((commandLabel) => {
      const leftStr = `  ${commandLabel.name.padEnd(maxCommandLength, " ")}    `;
      const leftStrFiller = Array(leftStr.length).fill(" ").join("");
      const descriptionLines = commandLabel.description.split("\n");
      const optionsTextOutput = generateOptionsTextOutput(commandLabel.options.options, maxCommandLength, 4);

      return (
        leftStr +
        descriptionLines
          .map((line, i) => {
            if (i === 0) {
              return line;
            }

            return `\n${leftStrFiller}${line}`;
          })
          .join("") +
        (optionsTextOutput.length ? `\n${optionsTextOutput}` : "")
      );
    })
    .join("\n");

  const outputTest = [
    optionsOutput &&
      `Options:
${optionsOutput}`,
    commandsOutput &&
      `Commands:
${commandsOutput}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  console.log(`Usage: ${[instance.input.name, instance.input.alias].filter(Boolean).join("|")}${
    optionsOutput ? " [options]" : ""
  }${commandsOutput ? " [command]" : ""}
${
  instance.input.description &&
  `
${instance.input.description}`
}

${outputTest}`);
};

const displayHelp = (commands, instance, command) => {
  if (command.name === root_command) return displayAllHelp(commands, instance);

  const { options, maxLength: maxOptionLength } = generateOptionsOutput(command.options);
  const optionsOutput = generateOptionsTextOutput(options, maxOptionLength, 2);

  const outputTest = [
    optionsOutput &&
      `Options:
${optionsOutput}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  console.log(`Usage: ${instance.input.name} ${command.name}${optionsOutput ? " [options]" : ""}
${
  command.description &&
  `
${command.description}`
}

${outputTest}`);
};

module.exports = {
  displayHelp,
};
