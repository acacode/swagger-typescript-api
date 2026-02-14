import type {
  GenerateTemplatesParams,
  HttpClientType,
} from "../../../types/index.js";
import { HTTP_CLIENT, PROJECT_VERSION } from "../../constants.js";
import { objectAssign } from "../../util/object-assign.js";

export class TemplatesGenConfig {
  cleanOutput = false;
  debug = false;
  httpClientType: HttpClientType = HTTP_CLIENT.FETCH;
  modular = false;
  output = undefined;
  rewrite = false;
  silent = false;
  version = PROJECT_VERSION;

  constructor(config: GenerateTemplatesParams) {
    this.update(config);
  }

  update = (update: Partial<GenerateTemplatesParams>) => {
    objectAssign(this, update);
  };
}
