/**
 * @typedef {{ fileName: string, fileExtension: string, fileContent: string }} TranslatorIO
 */

class Translator {
  /** @type {CodeGenConfig} */
  config;
  /** @type {CodeFormatter} */
  codeFormatter;

  /**
   * @param codeGenProcess
   */
  constructor(codeGenProcess) {
    this.config = codeGenProcess.config;
    this.codeFormatter = codeGenProcess.codeFormatter;
  }

  /**
   *
   * @param input {TranslatorIO}
   * @return {Promise<TranslatorIO[]>}
   */
  translate(input) {
    throw new Error("not implemented");
  }
}

export { Translator };
