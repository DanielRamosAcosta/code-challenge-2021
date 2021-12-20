import { Lang, toISO } from "./Lang.ts";

export class DateAndLang {
  private static isToWeekday: Record<string, string> = {
    monday: "mánudagur",
    tuesday: "þriðjudagur",
    wednesday: "miðvikudagur",
    thursday: "fimmtudagur",
    friday: "föstudagur",
    saturday: "laugardagur",
    sunday: "sunnudagur",
  };

  constructor(private date: Date, private lang: Lang) {}

  weekDayToString(): string {
    // Icelandic is not supported in Deno
    if (this.lang === Lang.IS) {
      const enWeekday = new DateAndLang(this.date, Lang.EN).weekDayToString();

      return DateAndLang.isToWeekday[enWeekday];
    }

    const formatter = new Intl.DateTimeFormat(toISO(this.lang), {
      weekday: "long",
    });

    return formatter.format(this.date).toLowerCase().replace("ț", "ţ"); // JS Intl does not support ț
  }
}
