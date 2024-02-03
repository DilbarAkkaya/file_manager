import welcome from "./src/welcome.mjs";
import readline from "node:readline/promises";
import path from "path";
import { stdin, stdout } from "process";
import { logCurrentDirectory } from "./src/logCurrentDirectory.mjs";
import { setHomeDirectory } from "./src/setHomeDirectory.mjs";
import up from "./src/up.mjs";

const app = async () => {
  try {
    setHomeDirectory();
    const username = welcome();
    console.log(`Welcome to the File Manager, ${username}!`);
    up()
    logCurrentDirectory();
    const lineInterface = readline.createInterface({ input: stdin, output: stdout });
    lineInterface.setPrompt('\x1b[95mPlease, enter command >> \x1b[0m');
    lineInterface.prompt()
    lineInterface.on("SIGINT", () => {
      console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
      lineInterface.close();
      logCurrentDirectory();
    })
    lineInterface.on("line", (line) => {
      logCurrentDirectory();
      lineInterface.setPrompt('\x1b[95mPlease, enter command >> \x1b[0m');
      lineInterface.prompt();
      if (line === ".exit") {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        lineInterface.close();
        logCurrentDirectory();
      }
    });
  } catch (error) {
    console.error("Please try again, an error occured:", error);
    logCurrentDirectory();
  }
}

await app();