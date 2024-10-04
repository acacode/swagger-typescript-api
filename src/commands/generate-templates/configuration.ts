import type { GenerateTemplatesParams } from "../../../types/index.js";
import { HTTP_CLIENT, PROJECT_VERSION } from "../../constants.js";
import { objectAssign } from "../../util/object-assign.js";

export class TemplatesGenConfig {
  cleanOutput = false;
  output = undefined;
  httpClientType = HTTP_CLIENT.FETCH;
  modular = false;
  silent = false;
  version = PROJECT_VERSION;
  rewrite = false;

  constructor(config: GenerateTemplatesParams) {
    this.update(config);
  }

  update = (update: Partial<GenerateTemplatesParams>) => {
    objectAssign(this, update);
  };
}
