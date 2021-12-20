import { expect } from "expect";
import { DateAndLang } from "../models/DateAndLang.ts";
import { InvalidDateError } from "../models/InvalidDateError.ts";
import { Lang } from "../models/Lang.ts";
import { DateAndLangParser } from "./DateAndLangParser.ts";

Deno.test("that parses AAAA-MM-DD", () => {
  const file = "1\n2021-04-01:ES";

  const dateAndLangs = DateAndLangParser.parseFromFile(file);
  const first = dateAndLangs[0].unwrap();

  expect(first).toEqual(new DateAndLang(new Date("2021-04-01"), Lang.ES));
});

Deno.test("that parses DD-MM-YYYY", () => {
  const file = "1\n20-02-2021:GR";

  const dateAndLangs = DateAndLangParser.parseFromFile(file);
  const first = dateAndLangs[0].unwrap();

  expect(first).toEqual(new DateAndLang(new Date("2021-02-20"), Lang.GR));
});

Deno.test("that returns error if 02/29 but not leap", () => {
  const file = "1\n29-02-2021:FR";

  const dateAndLangs = DateAndLangParser.parseFromFile(file);

  const error = dateAndLangs[0].unwrapErr();

  expect(error).toEqual(new InvalidDateError());
});

Deno.test("that returns the date if 02/29 but leap", () => {
  const file = "1\n2020-02-29:FR";

  const dateAndLangs = DateAndLangParser.parseFromFile(file);

  const first = dateAndLangs[0].unwrap();

  expect(first).toEqual(new DateAndLang(new Date("2020-02-29"), Lang.FR));
});

Deno.test("that returns an error if invalid month", () => {
  const file = "1\n15-20-2020:EN";

  const dateAndLangs = DateAndLangParser.parseFromFile(file);

  const error = dateAndLangs[0].unwrapErr();

  expect(error).toEqual(new InvalidDateError());
});
