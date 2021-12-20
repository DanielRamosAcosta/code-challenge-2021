import { WhatDayIsIt } from "./WhatDayIsIt.ts";
import { LoggerConsole } from "./services/LoggerConsole.ts";

const filePath = Deno.args[0];

if (!filePath || Deno.args.includes("--help")) {
  console.log("Usage: whatdayisit <file>");
  Deno.exit(1);
}

const text = await Deno.readTextFile(filePath);

new WhatDayIsIt(new LoggerConsole()).execute(text);
