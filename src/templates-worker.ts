import * as path from "node:path";
import * as url from "node:url";
import { consola } from "consola";
import * as Eta from "eta";
import lodash from "lodash";
import type { CodeGenProcess } from "./code-gen-process.js";
import type { CodeGenConfig } from "./configuration.js";
import type { FileSystem } from "./util/file-system.js";

export class TemplatesWorker {
  config: CodeGenConfig;
  fileSystem: FileSystem;
  getRenderTemplateData: CodeGenProcess["getRenderTemplateData"];

  constructor(
    config: CodeGenConfig,
    fileSystem: FileSystem,
    getRenderTemplateData: CodeGenProcess["getRenderTemplateData"],
  ) {
    this.config = config;
    this.fileSystem = fileSystem;
    this.getRenderTemplateData = getRenderTemplateData;
  }

  getTemplatePaths = (
    config: CodeGenConfig,
  ): CodeGenConfig["templatePaths"] => {
    const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
    const baseTemplatesPath = path.resolve(__dirname, "../templates/base");
    const defaultTemplatesPath = path.resolve(
      __dirname,
      "../templates/default",
    );
    const modularTemplatesPath = path.resolve(
      __dirname,
      "../templates/modular",
    );
    const originalTemplatesPath = config.modular
      ? modularTemplatesPath
      : defaultTemplatesPath;
    const customTemplatesPath = path.resolve(process.cwd(), config.templates);

    return {
      /** `templates/base` */
      base: baseTemplatesPath,
      /** `templates/default` */
      default: defaultTemplatesPath,
      /** `templates/modular` */
      modular: modularTemplatesPath,
      /** usage path if `--templates` option is not set */
      original: originalTemplatesPath,
      /** custom path to templates (`--templates`) */
      custom: customTemplatesPath,
    };
  };

  cropExtension = (path: string) =>
    this.config.templateExtensions.reduce(
      (path, ext) => (path.endsWith(ext) ? path.replace(ext, "") : path),
      path,
    );

  getTemplateFullPath = (path_: string, fileName: string) => {
    const raw = path.resolve(path_, "./", this.cropExtension(fileName));
    const pathVariants = this.config.templateExtensions.map(
      (extension) => `${raw}${extension}`,
    );

    return pathVariants.find(
      (variant) => !!this.fileSystem.pathIsExist(variant),
    );
  };

  requireFnFromTemplate = async (packageOrPath: string) => {
    const isPath =
      packageOrPath.startsWith("./") || packageOrPath.startsWith("../");

    if (isPath) {
      return await import(
        path.resolve(
          this.config.templatePaths.custom ||
            this.config.templatePaths.original,
          packageOrPath,
        )
      );
    }

    return await import(packageOrPath);
  };

  getTemplate = (name: string, fileName: string, path?: string) => {
    const { templatePaths } = this.config;

    if (path) {
      return this.fileSystem.getFileContent(path);
    }

    if (!fileName) return "";

    const customFullPath =
      templatePaths.custom &&
      this.getTemplateFullPath(templatePaths.custom, fileName);
    let fileContent =
      customFullPath && this.fileSystem.getFileContent(customFullPath);

    if (fileContent) {
      consola.info(
        `"${name.toLowerCase()}" template found in "${templatePaths.custom}"`,
      );
      return fileContent;
    }

    const baseFullPath = this.getTemplateFullPath(templatePaths.base, fileName);

    if (baseFullPath) {
      fileContent = this.fileSystem.getFileContent(baseFullPath);
    } else {
      if (templatePaths.custom) {
        consola.warn(
          "Code generator will use the default template:",
          `"${name.toLowerCase()}"`,
          "template not found in",
          `"${templatePaths.custom}"`,
        );
      } else {
        consola.info(
          `Code generator will use the default template for "${name.toLowerCase()}"`,
        );
      }
    }

    const originalFullPath = this.getTemplateFullPath(
      templatePaths.original,
      fileName,
    );

    if (originalFullPath) {
      fileContent = this.fileSystem.getFileContent(originalFullPath);
    }

    return fileContent;
  };

  getTemplates = ({ templatePaths }: CodeGenConfig) => {
    if (templatePaths.custom) {
      consola.info(
        `try to read templates from directory "${templatePaths.custom}"`,
      );
    }

    return lodash.reduce(
      this.config.templateInfos,
      (acc, { name, fileName }) => ({
        ...acc,
        [name]: this.getTemplate(name, fileName),
      }),
      {},
    );
  };

  findTemplateWithExt = (path: string) => {
    const raw = this.cropExtension(path);
    const pathVariants = this.config.templateExtensions.map(
      (extension) => `${raw}${extension}`,
    );
    return pathVariants.find((variant) => this.fileSystem.pathIsExist(variant));
  };

  getTemplateContent = (path_: string) => {
    const foundTemplatePathKey = lodash
      .keys(this.config.templatePaths)
      .find((key) => path_.startsWith(`@${key}`));

    const rawPath = path.resolve(
      path_.replace(
        `@${foundTemplatePathKey}`,
        this.config.templatePaths[foundTemplatePathKey],
      ),
    );
    const fixedPath = this.findTemplateWithExt(rawPath);

    if (fixedPath) {
      return this.fileSystem.getFileContent(fixedPath);
    }

    const customPath =
      this.config.templatePaths.custom &&
      this.findTemplateWithExt(
        path.resolve(this.config.templatePaths.custom, path_),
      );

    if (customPath) {
      return this.fileSystem.getFileContent(customPath);
    }

    const originalPath = this.findTemplateWithExt(
      path.resolve(this.config.templatePaths.original, path_),
    );

    if (originalPath) {
      return this.fileSystem.getFileContent(originalPath);
    }

    return "";
  };

  renderTemplate = (
    template: string,
    configuration: object,
    options: object = {},
  ) => {
    if (!template) return "";

    return Eta.render(
      template,
      {
        ...this.getRenderTemplateData(),
        ...configuration,
      },
      {
        async: false,
        ...options,
        includeFile: (
          path: string,
          configuration: object,
          options: object = {},
        ) => {
          return this.renderTemplate(
            this.getTemplateContent(path),
            configuration,
            options,
          );
        },
      },
    );
  };
}
