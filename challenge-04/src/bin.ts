import { MusicalScales } from "./MusicalScales.ts";
import { LoggerConsole } from "./services/LoggerConsole.ts";

const filePath = Deno.args[0];

if (!filePath || Deno.args.includes("--help")) {
  console.log("Usage: musicalscales <file>");
  Deno.exit(1);
}

const text = await Deno.readTextFile(filePath);

new MusicalScales(new LoggerConsole()).execute(text);
