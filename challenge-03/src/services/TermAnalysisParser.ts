import { CharScores } from "../models/CharScores.ts";
import { TermAnalysis } from "../models/TermAnalysis.ts";
import { Terms } from "../models/Terms.ts";
import { CharScoresParserFactory } from "./char-scores-parser/CharScoresParserFactory.ts";

export class TermAnalysisParser {
  private static parseTerms(termsStr: string): Terms {
    const terms = termsStr.split("-");

    if (Terms.isTerms(terms)) {
      return terms;
    }

    throw new Error("Invalid terms");
  }

  private static parseScores(charScoresStr: string): CharScores {
    return CharScoresParserFactory.create(charScoresStr).parse(charScoresStr);
  }

  private static parseTermAnalysis(termAnalysisStr: string): TermAnalysis {
    const [termsStr, scoresStr] = termAnalysisStr.split("|");

    return {
      terms: TermAnalysisParser.parseTerms(termsStr),
      scores: TermAnalysisParser.parseScores(scoresStr),
    };
  }

  public static parseFromFile(file: string): TermAnalysis[] {
    const [, ...cases] = file.trim().split("\n");

    return cases.map(TermAnalysisParser.parseTermAnalysis);
  }
}
