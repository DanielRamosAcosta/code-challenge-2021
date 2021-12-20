import { curry } from "../utils/curry.ts";
import { Note } from "./Note.ts";
import { Sequence } from "./Sequence.ts";

export type Scale = Note[];

const ScalePrivate = {
  noteTypeNotPresent: (scale: Scale, note: Note): boolean => {
    const hasSameType = curry(Note.hasSameType);

    return !scale.some(hasSameType(note));
  },
  useFlatIfAlreadyIncluded: (scale: Scale, note: Note): Note => {
    const lastInScale = scale[scale.length - 1];

    return Note.hasSameType(lastInScale, note)
      ? Note.switchAccidentalType(note)
      : note;
  },
  useSharpIfPreviousNotPresent(scale: Scale, note: Note): Note {
    return ScalePrivate.noteTypeNotPresent(scale, Note.previousNoteType(note))
      ? Note.switchAccidentalType(note)
      : note;
  },
};

export const Scale = {
  create(startNote: Note, sequence: Sequence): Scale {
    return sequence.reduce(
      (scale, distance) => {
        const last = scale[scale.length - 1];

        const note = Note.increment(last, distance);

        const note1 = ScalePrivate.useFlatIfAlreadyIncluded(scale, note);
        const note2 = ScalePrivate.useSharpIfPreviousNotPresent(scale, note1);

        return [...scale, note2];
      },
      [startNote],
    );
  },
  toString: (scale: Scale): string => {
    return scale.map(Note.toString).join("");
  },
};
