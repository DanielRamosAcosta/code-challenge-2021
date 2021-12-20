import { TermAnalysis } from "./models/TermAnalysis.ts";
import { Logger } from "./services/Logger.ts";
import { TermAnalysisParser } from "./services/TermAnalysisParser.ts";

export class TheNightOfTheHunter {
  constructor(private logger: Logger) {}

  private format(results: Array<string | null>): string {
    return results
      .map((result, i) => `Case #${i + 1}: ${result ?? "-"}`)
      .join("\n");
  }

  public execute(file: string): void {
    const termAnalyses = TermAnalysisParser.parseFromFile(file);

    const results = termAnalyses.map(TermAnalysis.getWinnerTerm);

    const resultsFormatted = this.format(results);

    this.logger.log(resultsFormatted);
  }
}
