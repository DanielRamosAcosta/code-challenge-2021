import { CharScores } from "../../models/CharScores.ts";
import { CharScoresParser } from "./CharScoresParser.ts";

export class CharScoresParserAssignment extends CharScoresParser {
  public static isAssignment(charScoresStr: string): boolean {
    return charScoresStr.includes("=");
  }

  public static create() {
    return new CharScoresParserAssignment();
  }

  public parse(charScoresStr: string): CharScores {
    return Object.fromEntries(
      this.toList(charScoresStr).map(this.keyValueToCharScore.bind(this)),
    );
  }

  private keyValueToCharScore(keyValue: string) {
    const matches = keyValue.match(/(\w)=(.+)/);

    if (!matches) {
      throw new Error(`Could not parse ${keyValue} as an assignment`);
    }

    return [matches[1], this.parseNumberOrThrow(matches[2])];
  }

  private toList(charScoresStr: string) {
    return charScoresStr.split(",");
  }
}
