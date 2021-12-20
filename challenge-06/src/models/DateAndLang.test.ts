import { expect } from "expect";
import { Lang } from "./Lang.ts";
import { DateAndLang } from "./DateAndLang.ts";

Deno.test("that transforms the date and lang correctly", () => {
  const dateAndLang = new DateAndLang(new Date("2021-04-01"), Lang.ES);

  const weekDay = dateAndLang.weekDayToString();

  expect(weekDay).toEqual("jueves");
});

Deno.test("that transforms the date and lang correctly on wednesday", () => {
  const dateAndLang = new DateAndLang(new Date("2021-04-07"), Lang.ES);

  const weekDay = dateAndLang.weekDayToString();

  expect(weekDay).toEqual("miércoles");
});

Deno.test("that transforms the tuesday in romanian", () => {
  const dateAndLang = new DateAndLang(new Date("2021-02-02"), Lang.RO);

  const weekDay = dateAndLang.weekDayToString();

  expect(weekDay).toEqual("marţi");
});

const langs = [
  { lang: Lang.CA, expectedResult: "dilluns" },
  { lang: Lang.CZ, expectedResult: "pondělí" },
  { lang: Lang.DE, expectedResult: "montag" },
  { lang: Lang.DK, expectedResult: "mandag" },
  { lang: Lang.EN, expectedResult: "monday" },
  { lang: Lang.ES, expectedResult: "lunes" },
  { lang: Lang.FI, expectedResult: "maanantai" },
  { lang: Lang.FR, expectedResult: "lundi" },
  { lang: Lang.IS, expectedResult: "mánudagur" },
  { lang: Lang.GR, expectedResult: "δευτέρα" },
  { lang: Lang.HU, expectedResult: "hétfő" },
  { lang: Lang.IT, expectedResult: "lunedì" },
  { lang: Lang.NL, expectedResult: "maandag" },
  { lang: Lang.VI, expectedResult: "thứ hai" },
  { lang: Lang.PL, expectedResult: "poniedziałek" },
  { lang: Lang.RO, expectedResult: "luni" },
  { lang: Lang.RU, expectedResult: "понедельник" },
  { lang: Lang.SE, expectedResult: "måndag" },
  { lang: Lang.SI, expectedResult: "ponedeljek" },
  { lang: Lang.SK, expectedResult: "pondelok" },
];

for (const { lang, expectedResult } of langs) {
  Deno.test(`that transforms the date and lang correctly in ${lang}`, () => {
    const dateAndLang = new DateAndLang(new Date("2021-02-01"), lang);

    const weekDay = dateAndLang.weekDayToString();

    expect(weekDay).toEqual(expectedResult);
  });
}
