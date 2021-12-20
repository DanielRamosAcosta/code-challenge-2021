import { CatchThemAll } from "./CatchThemAll.ts";
import { LoggerConsole } from "./services/LoggerConsole.ts";

const filePath = Deno.args[0];

if (!filePath || Deno.args.includes("--help")) {
  console.log("Usage: catchthemall <file>");
  Deno.exit(1);
}

const text = await Deno.readTextFile(filePath);

new CatchThemAll(new LoggerConsole()).execute(text);
