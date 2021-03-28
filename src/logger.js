const _ = require("lodash");
const { config } = require("./config");
const { emojify } = require("node-emoji");

/**
 *
 * @param {"warn" | "log" | "error"} kind
 * @param {keyof emoji} emojiName
 * @param  {...any} messages
 * @returns
 */
const createLogMessage = ({ kind, emojiName, messages }) => {
  if (config.silent) return;

  const emoji = emojify(emojiName);

  console[kind](
    emoji,
    " ",
    ..._.map(messages, (message) =>
      _.startsWith(message, "\n") ? `\n${emoji}   ${message.replace(/\n/, "")}` : message,
    ),
  );
};

const log = (...messages) =>
  createLogMessage({
    kind: "log",
    emojiName: ":sparkles:",
    messages,
  });
const eventLog = (...messages) =>
  createLogMessage({
    kind: "log",
    emojiName: ":comet: ",
    messages,
  });
const successLog = (...messages) =>
  createLogMessage({
    kind: "log",
    emojiName: ":white_check_mark:",
    messages,
  });
const warnLog = (...messages) =>
  createLogMessage({
    kind: "warn",
    emojiName: ":warning: ",
    messages,
  });
const errorLog = (...messages) =>
  createLogMessage({
    kind: "error",
    emojiName: ":exclamation:",
    messages,
  });

module.exports = {
  log,
  eventLog,
  successLog,
  warnLog,
  errorLog,
};
