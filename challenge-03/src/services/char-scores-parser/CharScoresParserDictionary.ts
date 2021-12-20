import { CharScores } from "../../models/CharScores.ts";
import { CharScoresParser } from "./CharScoresParser.ts";

export class CharScoresParserDictionary extends CharScoresParser {
  public static isDictionary(charScoresStr: string): boolean {
    return charScoresStr.includes("{");
  }

  public static create() {
    return new CharScoresParserDictionary();
  }

  public parse(charScoresStr: string): CharScores {
    return Object.fromEntries(
      this.toList(charScoresStr)
        .map(this.cleanSymbols)
        .map(this.keyValueToCharScore.bind(this)),
    );
  }

  private keyValueToCharScore(keyValue: string): [string, number] {
    const matches = keyValue.match(/'(\w)': (.+)/);

    if (!matches) {
      throw new Error(`Could not parse ${keyValue} as dictionary`);
    }

    return [matches[1], this.parseNumberOrThrow(matches[2])];
  }

  private cleanSymbols(keyValue: string): string {
    return keyValue.replace("{", "").replace("}", "");
  }

  private toList(charScoresStr: string) {
    return charScoresStr.split(",");
  }
}
