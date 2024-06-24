type CliStructOption = {
  default?: unknown;
  description?: string;
  flags?: string;
  internal?: { name?: string; formatter?: (value: any) => any };
  required?: boolean;
};

type CliStruct = {
  alias?: string;
  commands?: CliStruct[];
  description?: string;
  inherited?: string | null;
  name?: string;
  options: CliStructOption[];
  version?: string;
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
