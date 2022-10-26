import { skip_command } from "./constants";

type CliStructOption = {
  flags?: string;
  description?: string;
  default?: unknown;
};

type CliStruct = {
  inherited?: string | null;
  name?: string;
  alias?: string;
  version?: string;
  description?: string;
  options: CliStructOption[];
  commands?: CliStruct[];
};

type ExecuteOptions = {
  args: string[];
};

type ExecuteOutput = {
  command: null | string;
  options: Record<string, any>;
};

type CliInstance = {
  addCommand: (struct: CliStruct) => CliInstance;
  execute: (options: ExecuteOptions) => Promise<ExecuteOutput>;
};

type Cli = <S extends Omit<CliStruct, "inherited">>(struct: S) => CliInstance;

export declare const cli: Cli;
