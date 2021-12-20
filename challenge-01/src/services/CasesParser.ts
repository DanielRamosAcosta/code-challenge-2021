import { Cases } from "../models/Cases.ts";
import { Roll } from "../models/Roll.ts";
import { Rolls } from "../models/Rolls.ts";

export class CasesParser {
  private static parseIntOrThrow(str: string): number {
    const num = parseInt(str);

    if (isNaN(num)) {
      throw new Error(`Invalid number: ${str}`);
    }

    return num;
  }

  private static parseCases(cases: string[]): Cases {
    return cases.map(CasesParser.parseRolls);
  }

  private static parseRolls(rolls: string): Rolls {
    return rolls.split(":").map(CasesParser.parseRoll);
  }

  private static parseRoll(number: string): Roll {
    const num = CasesParser.parseIntOrThrow(number);

    if (num < 1 || num > 6) {
      throw new Error(`Invalid roll: ${num}`);
    }

    return num;
  }

  private static parseNumberCases(numberCasesStr: string): number {
    return CasesParser.parseIntOrThrow(numberCasesStr);
  }

  private static ensureNumberCasesMatches(
    numberCases: number,
    cases: Cases,
  ): void {
    if (numberCases !== cases.length) {
      throw new Error(
        `Number of cases does not match number of cases in file: ${numberCases} !== ${cases.length}`,
      );
    }
  }

  public static parseFromFile(file: string): Cases {
    const lines = file.trim().split("\n");

    const [numberCasesStr, ...casesStr] = lines;

    const numberCases = CasesParser.parseNumberCases(numberCasesStr);
    const cases = CasesParser.parseCases(casesStr);

    CasesParser.ensureNumberCasesMatches(numberCases, cases);

    return cases;
  }
}
