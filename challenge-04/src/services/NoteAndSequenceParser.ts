import { Note } from "../models/Note.ts";
import { Sequence } from "../models/Sequence.ts";
import { chunk } from "../utils/chunk.ts";

type NoteAndSequence = {
  note: Note;
  sequence: Sequence;
};

export class NoteAndSequenceParser {
  public static toLines(string: string): string[] {
    const [, ...cases] = string.trim().split("\n");

    return cases;
  }

  public static parseFromFile(file: string): NoteAndSequence[] {
    return chunk(NoteAndSequenceParser.toLines(file), 2).map(
      ([note, sequence]) => ({
        note: Note.fromString(note),
        sequence: Sequence.fromString(sequence),
      }),
    );
  }
}
