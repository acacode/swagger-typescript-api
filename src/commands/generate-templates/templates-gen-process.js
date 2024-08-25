import path from "node:path";
import url from "node:url";
import { consola } from "consola";
import { FileSystem } from "../../util/file-system.js";
import { TemplatesGenConfig } from "./configuration.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

class TemplatesGenProcess {
  /**
   * @type {TemplatesGenConfig}
   */
  config;
  /**
   * @type {FileSystem}
   */
  fileSystem;

  rootDir = path.resolve(__dirname, "../../../");

  paths = {
    baseTemplates: "templates/base",
    httpClientTemplates: "templates/base/http-clients",
    moduleApiTemplates: "templates/modular",
    defaultApiTemplates: "templates/default",
  };

  importTemplatePrefixes = ["@base", "@modular", "@default"];

  constructor(config) {
    this.config = new TemplatesGenConfig(config);
    this.fileSystem = new FileSystem(this);
  }

  /**
   * @return {Promise<GenerateTemplatesOutput>}
   */
  async start() {
    consola.info('start generating source templates ".ejs" for code generator');

    const templates = this.getTemplates();

    if (this.config.output) {
      consola.info("preparing output directory for source templates");
      const outputPath = path.resolve(process.cwd(), this.config.output);

      if (this.fileSystem.pathIsExist(outputPath)) {
        if (this.config.cleanOutput) {
          this.fileSystem.cleanDir(outputPath);
        }
      } else {
        this.fileSystem.createDir(outputPath);
      }

      for (const template of templates) {
        const templateName = this.fileSystem.cropExtension(template.name);
        const templateEjsPath = path.resolve(outputPath, `${templateName}.ejs`);
        const templateEtaPath = path.resolve(outputPath, `${templateName}.eta`);
        const templateEjsPathExist =
          this.fileSystem.pathIsExist(templateEjsPath);
        const templateEtaPathExist =
          this.fileSystem.pathIsExist(templateEtaPath);

        const templateNotExist = !templateEjsPathExist && !templateEtaPathExist;

        if (templateNotExist) {
          this.fileSystem.createFile({
            path: outputPath,
            fileName: template.name,
            content: template.content,
            withPrefix: false,
          });
        } else if (this.config.rewrite) {
          if (templateEjsPathExist) {
            this.fileSystem.createFile({
              path: outputPath,
              fileName: `${templateName}.ejs`,
              content: template.content,
              withPrefix: false,
            });
          } else if (templateEtaPathExist) {
            this.fileSystem.createFile({
              path: outputPath,
              fileName: `${templateName}.eta`,
              content: template.content,
              withPrefix: false,
            });
          }
        }
      }

      consola.success(
        `source templates has been successfully created in "${outputPath}"`,
      );
    }

    return {
      files: templates,
      configuration: this.config,
      createFile: this.fileSystem.createFile,
    };
  }

  getTemplates = () => {
    const outputFiles = [];
    const baseTemplates = this.getTemplateNamesFromDir(
      this.paths.baseTemplates,
    );
    const httpClientTemplates = this.getTemplateNamesFromDir(
      this.paths.httpClientTemplates,
    );
    const apiTemplatesPath = this.config.modular
      ? this.paths.moduleApiTemplates
      : this.paths.defaultApiTemplates;
    const apiTemplates = this.getTemplateNamesFromDir(apiTemplatesPath);

    const usingHttpClientTemplate = httpClientTemplates.find((template) =>
      template.startsWith(`${this.config.httpClientType}-`),
    );

    let httpClientTemplateContent = "";

    if (usingHttpClientTemplate) {
      httpClientTemplateContent = this.fixTemplateContent(
        this.getTemplateContent(
          `${this.paths.httpClientTemplates}/${usingHttpClientTemplate}`,
        ),
      );
    }

    for (const fileName of baseTemplates) {
      const templateContent =
        (fileName === "http-client.ejs" && httpClientTemplateContent) ||
        this.fixTemplateContent(
          this.getTemplateContent(`${this.paths.baseTemplates}/${fileName}`),
        );

      outputFiles.push({
        name: fileName,
        content: templateContent,
      });
    }

    for (const fileName of apiTemplates) {
      outputFiles.push({
        name: fileName,
        content: this.fixTemplateContent(
          this.getTemplateContent(`${apiTemplatesPath}/${fileName}`),
        ),
      });
    }

    return outputFiles;
  };

  fixTemplateContent = (content) => {
    // includeFile("@base/
    const importsRegExp1 = new RegExp(
      `includeFile\\("(${this.importTemplatePrefixes
        .map((v) => `(${v})`)
        .join("|")})/`,
      "g",
    );
    // includeFile(`@base/
    const importsRegExp2 = new RegExp(
      `includeFile\\(\`(${this.importTemplatePrefixes
        .map((v) => `(${v})`)
        .join("|")})/`,
      "g",
    );
    // includeFile('@base/
    const importsRegExp3 = new RegExp(
      `includeFile\\('(${this.importTemplatePrefixes
        .map((v) => `(${v})`)
        .join("|")})/`,
      "g",
    );

    return content
      .replace(importsRegExp1, 'includeFile("./')
      .replace(importsRegExp2, "includeFile(`./")
      .replace(importsRegExp3, "includeFile('./");
  };

  getTemplateNamesFromDir = (dir) => {
    return this.fileSystem
      .readDir(path.resolve(this.rootDir, dir))
      .filter((file) => file.endsWith(".ejs"));
  };

  getTemplateContent = (pathToFile) => {
    return this.fileSystem.getFileContent(
      path.resolve(this.rootDir, pathToFile),
    );
  };
}

export { TemplatesGenProcess };
