import { RollTheDice } from "./RollTheDice.ts";
import { LoggerConsole } from "./services/LoggerConsole.ts";

const filePath = Deno.args[0];

if (!filePath || Deno.args.includes("--help")) {
  console.log("Usage: rollthedice <file>");
  Deno.exit(1);
}

const text = await Deno.readTextFile(filePath);

new RollTheDice(new LoggerConsole()).execute(text);
