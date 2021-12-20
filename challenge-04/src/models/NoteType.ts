export enum NoteType {
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  A = "A",
  B = "B",
}

const allNoteTypes: NoteType[] = Object.values(NoteType);

export const indexOfNoteType = (noteType: NoteType): number =>
  allNoteTypes.indexOf(noteType);

export const noteTypeAtIndex = (index: number): NoteType =>
  allNoteTypes[(index + allNoteTypes.length) % allNoteTypes.length];

export const fromString = (noteType: string): NoteType => {
  if (allNoteTypes.includes(noteType as NoteType)) {
    return noteType as NoteType;
  }

  throw new Error(`Could not parse note type ${noteType}`);
};
