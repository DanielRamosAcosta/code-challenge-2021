import { TheNightOfTheHunter } from "./TheNightOfTheHunter.ts";
import { LoggerConsole } from "./services/LoggerConsole.ts";

const filePath = Deno.args[0];

if (!filePath || Deno.args.includes("--help")) {
  console.log("Usage: thenightofthehunter <file>");
  Deno.exit(1);
}

const text = await Deno.readTextFile(filePath);

new TheNightOfTheHunter(new LoggerConsole()).execute(text);
