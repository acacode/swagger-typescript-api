const { emojify } = require("node-emoji");
const _ = require("lodash");

class Logger {
  firstLog = true;
  /**
   * @type {CodeGenConfig}
   */
  config;

  constructor(config) {
    this.config = config;
  }

  createLogMessage = ({ type, emojiName, messages }) => {
    if (this.config.silent) return;

    const emoji = emojify(emojiName);

    if (this.firstLog) {
      this.firstLog = false;
      this.log(
        `swagger-typescript-api(${this.config.version}),${
          process.env.npm_config_user_agent || `nodejs(${process.version})`
        }`,
      );
    }

    console[type](
      emoji,
      " ",
      ..._.map(messages, (message) =>
        _.startsWith(message, "\n") ? `\n${emoji}   ${message.replace(/\n/, "")}` : message,
      ),
    );
  };

  /**
   *
   * @param messages {any[]}
   */
  log = (...messages) =>
    this.createLogMessage({
      type: "log",
      emojiName: ":sparkles:",
      messages,
    });

  /**
   *
   * @param messages {any[]}
   * @return {void}
   */
  event = (...messages) =>
    this.createLogMessage({
      type: "log",
      emojiName: ":comet: ",
      messages,
    });

  /**
   *
   * @param messages {any[]}
   * @return {void}
   */
  success = (...messages) =>
    this.createLogMessage({
      type: "log",
      emojiName: ":white_check_mark:",
      messages,
    });

  /**
   *
   * @param messages {any[]}
   * @return {void}
   */
  warn = (...messages) =>
    this.createLogMessage({
      type: "warn",
      emojiName: ":warning: ",
      messages,
    });

  /**
   *
   * @param messages {any[]}
   * @return {void}
   */
  error = (...messages) =>
    this.createLogMessage({
      type: "error",
      emojiName: ":exclamation:",
      messages,
    });
}

module.exports = {
  Logger,
};
