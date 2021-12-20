import { expect, mock } from "expect";
import { WhatDayIsIt } from "./WhatDayIsIt.ts";

Deno.test("that works with simple input", () => {
  const file = `1
2021-04-01:ES`;
  const logSpy = mock.fn();
  const whatDayIsIt = new WhatDayIsIt({ log: logSpy });

  whatDayIsIt.execute(file);

  expect(logSpy).toHaveBeenCalledWith("Case #1: jueves");
});

Deno.test("that works with the example", () => {
  const file = `12
2021-04-01:ES
2021-04-07:ES
01-02-2021:GR
2021-02-07:VI
2021-02-01:DE
01-02-2021:EN
01-02-2021:XX
29-02-2021:FR
15-20-2020:EN
2020-02-29:RU
01-02-2021:CA
2021-02-01:CZ`;
  const logSpy = mock.fn();
  const whatDayIsIt = new WhatDayIsIt({ log: logSpy });

  whatDayIsIt.execute(file);

  expect(logSpy).toHaveBeenCalledWith(`Case #1: jueves
Case #2: miércoles
Case #3: δευτέρα
Case #4: chủ nhật
Case #5: montag
Case #6: monday
Case #7: INVALID_LANGUAGE
Case #8: INVALID_DATE
Case #9: INVALID_DATE
Case #10: суббота
Case #11: dilluns
Case #12: pondělí`);
});
