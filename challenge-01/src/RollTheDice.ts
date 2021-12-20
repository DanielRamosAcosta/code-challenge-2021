import { Cases } from "./models/Cases.ts";
import { CasesParser } from "./services/CasesParser.ts";
import { Logger } from "./services/Logger.ts";

export class RollTheDice {
  constructor(private logger: Logger) {}

  public execute(text: string): void {
    const cases = CasesParser.parseFromFile(text);
    const minimumScores = Cases.getMinimumScore(cases);

    const minimumScoresFormatted = minimumScores
      .map((score, i) => `Case #${i + 1}: ${score ?? "-"}`)
      .join("\n");

    this.logger.log(minimumScoresFormatted);
  }
}
