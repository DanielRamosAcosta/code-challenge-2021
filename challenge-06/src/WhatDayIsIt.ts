import { DateAndLangParser } from "./services/DateAndLangParser.ts";
import { Logger } from "./services/Logger.ts";

export class WhatDayIsIt {
  constructor(private logger: Logger) {}

  private format(weekdays: Array<string>): string {
    return weekdays
      .map((weekdays, i) => `Case #${i + 1}: ${weekdays}`)
      .join("\n");
  }

  public execute(file: string): void {
    const results = DateAndLangParser.parseFromFile(file).map((dateAndLang) =>
      dateAndLang
        .map((dateAndLang) => dateAndLang.weekDayToString())
        .unwrapOrElse((error) => error.getType())
    );

    const result = this.format(results);

    this.logger.log(result);
  }
}
