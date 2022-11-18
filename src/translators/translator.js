/**
 * @typedef {{ fileName: string, fileExtension: string, fileContent: string }} TranslatorIO
 */

class Translator {
  /** @type {Logger} */
  logger;
  /** @type {CodeGenConfig} */
  config;
  /** @type {CodeFormatter} */
  codeFormatter;

  /**
   * @param codeGenProcess
   */
  constructor(codeGenProcess) {
    this.logger = codeGenProcess.logger;
    this.config = codeGenProcess.config;
    this.codeFormatter = codeGenProcess.codeFormatter;
  }

  /**
   *
   * @param input {TranslatorIO}
   * @return {TranslatorIO[]}
   */
  translate(input) {
    throw new Error("not implemented");
  }
}

module.exports = {
  Translator,
};
