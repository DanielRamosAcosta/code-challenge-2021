import { MapSearches } from "./models/MapSearches.ts";
import { Logger } from "./services/Logger.ts";
import { MapSearchParser } from "./services/MapSearchParser.ts";

export class CatchThemAll {
  constructor(private logger: Logger) {}

  private format(results: string[]): string {
    return results.map((result, i) => `Case #${i + 1}: ${result}`).join("\n");
  }

  public execute(text: string): void {
    const mapSearches = MapSearchParser.parseFromFile(text);

    const results = MapSearches.search(mapSearches);

    this.logger.log(this.format(results));
  }
}
