const program = require('commander');
const { resolve } = require('path');
const { generate } = require('./src');
const { version } = require('./package.json');

program
  .version(version, '-v, --version', 'output the current version')
  .requiredOption('-p, --path <path>', 'path to swagger scheme')
  .option('-o, --output <output>', 'output path of typescript api file', '.')
  .option('-n, --name <name>', 'name of output typescript api file', 'api.ts');
 
program.parse(process.argv);

const { path, output, name } = program;

generate({
  name,
  input: resolve(process.cwd(), path),
  output: resolve(process.cwd(), output || '.', `./${name}`)
})