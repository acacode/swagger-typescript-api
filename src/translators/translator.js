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
   * @return {Promise<TranslatorIO[]>}
   */
  // eslint-disable-next-line no-unused-vars
  translate(input) {
    throw new Error('not implemented');
  }
}

module.exports = {
  Translator,
};
