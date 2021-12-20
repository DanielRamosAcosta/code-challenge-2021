import {
  fromString as NoteTypeFromString,
  indexOfNoteType,
  NoteType,
  noteTypeAtIndex,
} from "./NoteType.ts";
import {
  AccidentalType,
  fromString as AccidentalTypeFromString,
} from "./AccidentalType.ts";
import { Distance } from "./Distance.ts";
import { curry } from "../utils/curry.ts";

export type Note = {
  noteType: NoteType;
  accidentalType: AccidentalType;
};

export const NotePrivate = {
  findChromaticIndex: (note: Note): number | null => {
    const newLocal = chromaticScale.findIndex(curry(Note.equals)(note));

    if (newLocal === -1) {
      return null;
    }

    return newLocal;
  },
  findNoteTypeIndex: (note: Note): number => {
    return indexOfNoteType(note.noteType);
  },
  findChromaticIndexOrSwitch: (note: Note): number => {
    if (Note.isFlat(note)) {
      return NotePrivate.findChromaticIndexOrSwitch(
        Note.switchAccidentalType(note),
      );
    }

    return chromaticScale.findIndex(curry(Note.equals)(note));
  },
  findNoteAtChromaticIndex: (index: number): Note =>
    chromaticScale[(index + chromaticScale.length) % chromaticScale.length],
  containedInChrmaticScale: (note: Note): boolean =>
    chromaticScale.some(curry(Note.equals)(note)),
  nextInChromaticScale: (note: Note): Note => {
    const chromaticIndex = NotePrivate.findChromaticIndex(note);

    if (chromaticIndex == null) {
      throw new Error(`${Note.toString(note)} is not in the chromatic scale`);
    }

    return NotePrivate.findNoteAtChromaticIndex(chromaticIndex + 1);
  },
  previousInChromaticScale: (note: Note): Note => {
    const chromaticIndex = NotePrivate.findChromaticIndex(note);

    if (chromaticIndex == null) {
      throw new Error(`${Note.toString(note)} is not in the chromatic scale`);
    }

    return NotePrivate.findNoteAtChromaticIndex(chromaticIndex - 1);
  },
};

export const Note = {
  create: (noteType: NoteType, accidentalType: AccidentalType): Note => {
    return {
      noteType,
      accidentalType,
    };
  },
  createNatural: (noteType: NoteType): Note =>
    Note.create(noteType, AccidentalType.NATURAL),
  createFlat: (noteType: NoteType): Note =>
    Note.create(noteType, AccidentalType.FLAT),
  createSharp: (noteType: NoteType): Note =>
    Note.create(noteType, AccidentalType.SHARP),
  fromString: (note: string): Note => {
    const [noteType, accidentalType = ""] = note.split("");

    return {
      noteType: NoteTypeFromString(noteType),
      accidentalType: AccidentalTypeFromString(accidentalType),
    };
  },
  isNatural: (note: Note): boolean =>
    note.accidentalType === AccidentalType.NATURAL,
  isSharp: (note: Note): boolean =>
    note.accidentalType === AccidentalType.SHARP,
  isFlat: (note: Note): boolean => note.accidentalType === AccidentalType.FLAT,
  equals: (note1: Note, note2: Note) =>
    note1.noteType === note2.noteType &&
    note1.accidentalType === note2.accidentalType,
  increment: (note: Note, distance: Distance): Note => {
    if (!NotePrivate.containedInChrmaticScale(note)) {
      return Note.increment(Note.switchAccidentalType(note), distance);
    }

    const index = NotePrivate.findChromaticIndexOrSwitch(note);

    if (distance === Distance.TONE) {
      return NotePrivate.findNoteAtChromaticIndex(index + 2);
    } else {
      return NotePrivate.findNoteAtChromaticIndex(index + 1);
    }
  },
  previousNoteType: (note: Note): Note => {
    const index = NotePrivate.findNoteTypeIndex(note);

    return Note.createNatural(noteTypeAtIndex(index - 1));
  },
  nextNoteType: (note: Note): Note => {
    const index = NotePrivate.findNoteTypeIndex(note);

    return Note.createNatural(noteTypeAtIndex(index + 1));
  },
  switchAccidentalType: (note: Note): Note => {
    if (Note.isFlat(note)) {
      const chromaticIndex = NotePrivate.findChromaticIndex(
        Note.toNatural(note),
      );

      if (chromaticIndex == null) {
        throw new Error(`${Note.toString(note)} is not in the chromatic scale`);
      }

      return NotePrivate.findNoteAtChromaticIndex(chromaticIndex - 1);
    }

    const chromaticIndex = NotePrivate.findChromaticIndex(note);

    if (chromaticIndex == null) {
      return Note.nextNoteType(note);
    }

    const nextNote = NotePrivate.nextInChromaticScale(note);
    const previousNote = NotePrivate.previousInChromaticScale(note);

    if (Note.isSharp(note)) {
      return Note.toFlat(nextNote);
    }

    if (Note.isNatural(nextNote)) {
      return Note.toFlat(nextNote);
    }

    if (Note.isNatural(previousNote)) {
      return Note.toSharp(previousNote);
    }

    return note;
  },
  hasSameType: (note1: Note, note2: Note): boolean =>
    note1.noteType === note2.noteType,
  toFlat: (note: Note): Note => Note.createFlat(note.noteType),
  toNatural: (note: Note): Note => Note.createNatural(note.noteType),
  toSharp: (note: Note): Note => Note.createSharp(note.noteType),
  toString: (note: Note): string => `${note.noteType}${note.accidentalType}`,
};

const chromaticScale = [
  Note.createNatural(NoteType.C),
  Note.createSharp(NoteType.C),
  Note.createNatural(NoteType.D),
  Note.createSharp(NoteType.D),
  Note.createNatural(NoteType.E),
  Note.createNatural(NoteType.F),
  Note.createSharp(NoteType.F),
  Note.createNatural(NoteType.G),
  Note.createSharp(NoteType.G),
  Note.createNatural(NoteType.A),
  Note.createSharp(NoteType.A),
  Note.createNatural(NoteType.B),
];
