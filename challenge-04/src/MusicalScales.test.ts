import { expect, mock } from "expect";
import { MusicalScales } from "./MusicalScales.ts";

Deno.test("that works with simple input", () => {
  const file = `1
G
TTTsTTs`;
  const logSpy = mock.fn();
  const musicalScales = new MusicalScales({ log: logSpy });

  musicalScales.execute(file);

  expect(logSpy).toHaveBeenCalledWith("Case #1: GABC#DEF#G");
});

Deno.test("that works with the given input", () => {
  const file = `3
G
TTTsTTs
A
sTTsTTT
A
TTsTTsT`;
  const logSpy = mock.fn();
  const musicalScales = new MusicalScales({ log: logSpy });

  musicalScales.execute(file);

  expect(logSpy).toHaveBeenCalledWith(`Case #1: GABC#DEF#G
Case #2: ABbCDEbFGA
Case #3: ABC#DEF#GA`);
});
