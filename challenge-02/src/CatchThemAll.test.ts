import { expect, mock } from "expect";
import { CatchThemAll } from "./CatchThemAll.ts";

Deno.test("that works with the given input", () => {
  const file = `2
1 4 6
SNORLAX
T A K E C A
S N O R L A
X R E W I T
H V E N O M
2 3 10
PIKACHU
CHARIZARD
N O P O K E M U H C
A K I C H A R I Z A
R D P O N S H E R E`;
  const logSpy = mock.fn();
  const catchThemAll = new CatchThemAll({ log: logSpy });

  catchThemAll.execute(file);

  expect(logSpy).toHaveBeenCalledWith(`Case #1: TAKECAREWITHVENOM
Case #2: NOPOKEMONSHERE`);
});
