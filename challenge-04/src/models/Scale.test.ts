import { expect } from "expect";
import { Note } from "./Note.ts";
import { NoteType } from "./NoteType.ts";
import { Scale } from "./Scale.ts";
import { Sequence } from "./Sequence.ts";

Deno.test("that creates the major scale", () => {
  const startNote = Note.createNatural(NoteType.C);
  const sequence = Sequence.createIonian();

  const scale = Scale.create(startNote, sequence);

  expect(Scale.toString(scale)).toEqual("CDEFGABC");
});

Deno.test("that creates the minor scale", () => {
  const startNote = Note.createNatural(NoteType.C);
  const sequence = Sequence.createDorian();

  const scale = Scale.create(startNote, sequence);

  expect(Scale.toString(scale)).toEqual("CDEbFGAbBbC");
});

Deno.test("that works with the first example", () => {
  const startNote = Note.createNatural(NoteType.G);
  const sequence = Sequence.createLydian();

  const scale = Scale.create(startNote, sequence);

  expect(Scale.toString(scale)).toEqual("GABC#DEF#G");
});

Deno.test("that works with the second example", () => {
  const startNote = Note.createNatural(NoteType.A);
  const sequence = Sequence.createLocrian();

  const scale = Scale.create(startNote, sequence);

  expect(Scale.toString(scale)).toEqual("ABbCDEbFGA");
});

Deno.test("that works with the third example", () => {
  const startNote = Note.createNatural(NoteType.A);
  const sequence = Sequence.createMixolydian();

  const scale = Scale.create(startNote, sequence);

  expect(Scale.toString(scale)).toEqual("ABC#DEF#GA");
});

Deno.test("that generates the scale from C# in ionian mode", () => {
  const startNote = Note.createSharp(NoteType.C);
  const sequence = Sequence.createIonian();

  const scale = Scale.create(startNote, sequence);

  expect(Scale.toString(scale)).toEqual("C#D#E#F#G#A#B#C#");
});

Deno.test("that generates the scale from Gb in ionian mode", () => {
  const startNote = Note.createFlat(NoteType.G);
  const sequence = Sequence.createIonian();

  const scale = Scale.create(startNote, sequence);

  expect(Scale.toString(scale)).toEqual("GbAbBbCbDbEbFGb");
});
