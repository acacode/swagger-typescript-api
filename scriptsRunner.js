const packageJson = require("./package.json");
const { exec, spawn } = require("child_process");

const commands = process.argv.slice(2);

const packageScripts = Object.keys(packageJson.scripts);

const execute = (scriptName) =>
  new Promise((resolve, reject) => {
    console.log(`npm run ${scriptName}`);
    const spawned = spawn(/^win/.test(process.platform) ? "npm.cmd" : "npm", ["run", scriptName]);

    spawned.stdout.on("data", (data) => {
      process.stdout.write(data);
    });

    spawned.stderr.on("data", (data) => {
      process.stderr.write(data);
    });

    spawned.on("close", (code) => {
      if (code) {
        reject(code);
      } else {
        resolve(code);
      }
    });
  });

const run = async () => {
  for (const scriptName of packageScripts) {
    for (const command of commands) {
      if (scriptName === command) {
        await execute(scriptName);
      }

      if (command.includes("*")) {
        const commandPart = command.replace("*", "");
        // TODO: refactor
        if (scriptName.startsWith(commandPart) || scriptName.endsWith(commandPart)) {
          await execute(scriptName);
        }
      }
    }
  }
};

run();
