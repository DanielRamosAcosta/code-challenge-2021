import { CharScores } from "../../models/CharScores.ts";
import { CharScoresParser } from "./CharScoresParser.ts";

export class CharScoresParserTuple extends CharScoresParser {
  public static isTuple(charScoresStr: string): boolean {
    return charScoresStr.includes("[(");
  }

  public static create() {
    return new CharScoresParserTuple();
  }

  public parse(charScoresStr: string): CharScores {
    return Object.fromEntries(
      this.toList(charScoresStr)
        .map(this.cleanSymbols)
        .map(this.keyValueToChar.bind(this)),
    );
  }

  private keyValueToChar(keyValue: string): [string, number] {
    const [char, score] = keyValue.split(/, ?/);

    return [this.parseChar(char), this.parseNumberOrThrow(score)];
  }

  private parseChar(char: string) {
    return char.replace(/'/g, "").trim();
  }

  private cleanSymbols(keyValue: string): string {
    return keyValue
      .replace("(", "")
      .replace("[", "")
      .replace(")", "")
      .replace("]", "");
  }

  private toList(charScoresStr: string) {
    return charScoresStr.split("),");
  }
}
