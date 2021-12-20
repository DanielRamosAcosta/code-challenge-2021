import { expect } from "expect";
import { CasesParser } from "./CasesParser.ts";

Deno.test("the correct parse of a file", () => {
  const file = "1\n1:1";

  const cases = CasesParser.parseFromFile(file);

  expect(cases).toEqual([[1, 1]]);
});

Deno.test("the multiple cases", () => {
  const file = "3\n1:1\n2:2\n3:3";

  const cases = CasesParser.parseFromFile(file);

  expect(cases).toEqual([
    [1, 1],
    [2, 2],
    [3, 3],
  ]);
});

Deno.test("that throws an error if number of cases does not match", () => {
  const file = "4\n1:1\n2:2\n3:3";

  expect(() => CasesParser.parseFromFile(file)).toThrow(
    "Number of cases does not match number of cases in file: 4 !== 3",
  );
});

Deno.test("that throws an error strange characters are passed", () => {
  const file = "a\n1:1";

  expect(() => CasesParser.parseFromFile(file)).toThrow("Invalid number: a");
});

Deno.test("that an error on lower numbers than a dice", () => {
  const file = "1\n1:-1";

  expect(() => CasesParser.parseFromFile(file)).toThrow("Invalid roll: -1");
});

Deno.test("that an error on greater numbers than a dice", () => {
  const file = "1\n1:7";

  expect(() => CasesParser.parseFromFile(file)).toThrow("Invalid roll: 7");
});
