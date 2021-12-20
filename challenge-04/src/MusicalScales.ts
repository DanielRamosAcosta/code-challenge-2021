import { Scale } from "./models/Scale.ts";
import { Logger } from "./services/Logger.ts";
import { NoteAndSequenceParser } from "./services/NoteAndSequenceParser.ts";

export class MusicalScales {
  constructor(private logger: Logger) {}

  private format(scales: Array<Scale>): string {
    return scales
      .map((scale, i) => `Case #${i + 1}: ${Scale.toString(scale)}`)
      .join("\n");
  }

  public execute(file: string): void {
    const notesAndSequences = NoteAndSequenceParser.parseFromFile(file);

    const scales = notesAndSequences.map(({ note, sequence }) =>
      Scale.create(note, sequence)
    );

    this.logger.log(this.format(scales));
  }
}
