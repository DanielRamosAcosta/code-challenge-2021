import { expect, mock } from "expect";
import { RollTheDice } from "./RollTheDice.ts";

Deno.test("that works with the given input", () => {
  const file = `8
1:3
3:3
6:5
5:6
6:6
1:1
2:1
4:4`;
  const logSpy = mock.fn();
  const rollTheDice = new RollTheDice({ log: logSpy });

  rollTheDice.execute(file);

  expect(logSpy).toHaveBeenCalledWith(`Case #1: 5
Case #2: 7
Case #3: 12
Case #4: 12
Case #5: -
Case #6: 3
Case #7: 4
Case #8: 9`);
});
