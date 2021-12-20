import { CharScores } from "../../models/CharScores.ts";

export abstract class CharScoresParser {
  public abstract parse(charScoresStr: string): CharScores;

  protected parseNumberOrThrow(str: string): number {
    if (str.includes("/")) {
      const [num, denom] = str.split("/");

      return this.parseNumberOrThrow(num) / this.parseNumberOrThrow(denom);
    }

    const parsed = parseInt(str);

    if (isNaN(parsed)) {
      throw new Error(`Could not parse ${str} as an integer`);
    }

    return parsed;
  }
}
