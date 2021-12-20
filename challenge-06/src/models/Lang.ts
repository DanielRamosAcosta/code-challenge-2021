import { Err, Ok, Result } from "monads";
import { InvalidLanguageError } from "./InvalidLanguageError.ts";

export enum Lang {
  CA = "CA",
  CZ = "CZ",
  DE = "DE",
  DK = "DK",
  EN = "EN",
  ES = "ES",
  FI = "FI",
  FR = "FR",
  IS = "IS",
  GR = "GR",
  HU = "HU",
  IT = "IT",
  NL = "NL",
  VI = "VI",
  PL = "PL",
  RO = "RO",
  RU = "RU",
  SE = "SE",
  SI = "SI",
  SK = "SK",
}

export const fromString = (lang: string): Result<Lang, InvalidLanguageError> =>
  Object.values(Lang).includes(lang as Lang)
    ? Ok(lang as Lang)
    : Err(new InvalidLanguageError());

const isoMap: Record<Lang, string> = {
  [Lang.CA]: "ca",
  [Lang.CZ]: "cs-CZ",
  [Lang.DE]: "de",
  [Lang.DK]: "da",
  [Lang.EN]: "en",
  [Lang.ES]: "es",
  [Lang.FI]: "fi",
  [Lang.FR]: "fr",
  [Lang.IS]: "is",
  [Lang.GR]: "el-GR",
  [Lang.HU]: "hu",
  [Lang.IT]: "it",
  [Lang.NL]: "nl",
  [Lang.VI]: "vi",
  [Lang.PL]: "pl",
  [Lang.RO]: "ro",
  [Lang.RU]: "ru",
  [Lang.SE]: "sv",
  [Lang.SI]: "sl",
  [Lang.SK]: "sk",
};

export const toISO = (lang: Lang): string => isoMap[lang];
