import type {
  GenerateTemplatesParams,
  HttpClientType,
} from "../../../types/index.js";
import { HTTP_CLIENT, PROJECT_VERSION } from "../../constants.js";
import { objectAssign } from "../../util/object-assign.js";

export class TemplatesGenConfig {
  cleanOutput = false;
  output = undefined;
  httpClientType: HttpClientType = HTTP_CLIENT.FETCH;
  modular = false;
  rewrite = false;
  silent = false;
  debug = false;
  version = PROJECT_VERSION;

  constructor(config: GenerateTemplatesParams) {
    this.update(config);
  }

  update = (update: Partial<GenerateTemplatesParams>) => {
    objectAssign(this, update);
  };
}
