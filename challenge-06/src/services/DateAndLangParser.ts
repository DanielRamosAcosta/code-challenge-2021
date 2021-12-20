import { Err, Ok, Result } from "monads";
import { DateAndLang } from "../models/DateAndLang.ts";
import { InvalidDateError } from "../models/InvalidDateError.ts";
import { fromString } from "../models/Lang.ts";
import { DomainError } from "../utils/DomainError.ts";

export class DateAndLangParser {
  private static toLines(string: string): string[] {
    const [, ...cases] = string.trim().split("\n");

    return cases;
  }

  private static createDate(dateStr: string): Result<Date, InvalidDateError> {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      return Err(new InvalidDateError());
    }

    return Ok(date);
  }

  private static createDateFromComponents(
    year: number,
    month: number,
    day?: number,
  ): Result<Date, InvalidDateError> {
    if (month > 11) {
      return Err(new InvalidDateError());
    }

    const date = new Date(Date.UTC(year, month, day));

    if (isNaN(date.getTime())) {
      return Err(new InvalidDateError());
    }

    if (date.getMonth() !== month) {
      return Err(new InvalidDateError());
    }

    return Ok(date);
  }

  private static parseDate(date: string): Result<Date, InvalidDateError> {
    const matchDDMMYYYY = date.match(/^(\d{2})-(\d{2})-(\d{4})$/);

    if (matchDDMMYYYY) {
      const [, day, month, year] = matchDDMMYYYY;

      return DateAndLangParser.createDateFromComponents(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
      );
    }

    const matchYYYYMMDD = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (matchYYYYMMDD) {
      const [, year, month, day] = matchYYYYMMDD;

      return DateAndLangParser.createDateFromComponents(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
      );
    }

    return Err(new InvalidDateError());
  }

  public static parseFromFile(
    file: string,
  ): Array<Result<DateAndLang, DomainError>> {
    return DateAndLangParser.toLines(file).map((line) => {
      const [date, lang] = line.split(":");

      return fromString(lang).andThen((lang) =>
        DateAndLangParser.parseDate(date).map(
          (date) => new DateAndLang(date, lang),
        )
      );
    });
  }
}
