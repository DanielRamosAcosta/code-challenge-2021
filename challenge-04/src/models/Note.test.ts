import { expect } from "expect";
import { Distance } from "./Distance.ts";
import { Note } from "./Note.ts";
import { NoteType } from "./NoteType.ts";

Deno.test("that increments a natural note", () => {
  const note = Note.createNatural(NoteType.C);

  const newNote = Note.increment(note, Distance.TONE);

  expect(newNote).toEqual(Note.createNatural(NoteType.D));
});

Deno.test("that increments a sharped note", () => {
  const note = Note.createSharp(NoteType.C);

  const newNote = Note.increment(note, Distance.TONE);

  expect(newNote).toEqual(Note.createSharp(NoteType.D));
});

Deno.test("that increments a flat note", () => {
  const note = Note.createFlat(NoteType.D);

  const newNote = Note.increment(note, Distance.TONE);

  expect(newNote).toEqual(Note.createSharp(NoteType.D));
});

Deno.test("increments E# to F#", () => {
  const note = Note.createSharp(NoteType.E);

  const newNote = Note.increment(note, Distance.SEMITONE);

  expect(newNote).toEqual(Note.createSharp(NoteType.F));
});

Deno.test("increments B# to C#", () => {
  const note = Note.createSharp(NoteType.B);

  const newNote = Note.increment(note, Distance.SEMITONE);

  expect(newNote).toEqual(Note.createSharp(NoteType.C));
});

Deno.test("increments Cb to C#", () => {
  const note = Note.createFlat(NoteType.C);

  const newNote = Note.increment(note, Distance.TONE);

  expect(newNote).toEqual(Note.createSharp(NoteType.C));
});

Deno.test("that switches the accidental type from sharps", () => {
  const note = Note.createSharp(NoteType.C);

  const newNote = Note.switchAccidentalType(note);

  expect(newNote).toEqual(Note.createFlat(NoteType.D));
});

Deno.test("that switches the accidental type from flats", () => {
  const note = Note.createFlat(NoteType.D);

  const newNote = Note.switchAccidentalType(note);

  expect(newNote).toEqual(Note.createSharp(NoteType.C));
});

Deno.test("that switches Cb for B", () => {
  const note = Note.createFlat(NoteType.C);

  const newNote = Note.switchAccidentalType(note);

  expect(newNote).toEqual(Note.createNatural(NoteType.B));
});

Deno.test("that switches Fb for E", () => {
  const note = Note.createFlat(NoteType.F);

  const newNote = Note.switchAccidentalType(note);

  expect(newNote).toEqual(Note.createNatural(NoteType.E));
});

Deno.test("that switches F for E#", () => {
  const note = Note.createNatural(NoteType.F);

  const newNote = Note.switchAccidentalType(note);

  expect(newNote).toEqual(Note.createSharp(NoteType.E));
});

Deno.test("that switches E for Fb", () => {
  const note = Note.createNatural(NoteType.E);

  const newNote = Note.switchAccidentalType(note);

  expect(newNote).toEqual(Note.createFlat(NoteType.F));
});

Deno.test("that switches E# for F", () => {
  const note = Note.createSharp(NoteType.E);

  const newNote = Note.switchAccidentalType(note);

  expect(newNote).toEqual(Note.createNatural(NoteType.F));
});

Deno.test("that switches C for B#", () => {
  const note = Note.createNatural(NoteType.C);

  const newNote = Note.switchAccidentalType(note);

  expect(newNote).toEqual(Note.createSharp(NoteType.B));
});

Deno.test("that switches B# for C", () => {
  const note = Note.createSharp(NoteType.B);

  const newNote = Note.switchAccidentalType(note);

  expect(newNote).toEqual(Note.createNatural(NoteType.C));
});

Deno.test("that does not switches D for any other", () => {
  const note = Note.createNatural(NoteType.D);

  const newNote = Note.switchAccidentalType(note);

  expect(newNote).toEqual(Note.createNatural(NoteType.D));
});

Deno.test("that does not switches G for any other", () => {
  const note = Note.createNatural(NoteType.G);

  const newNote = Note.switchAccidentalType(note);

  expect(newNote).toEqual(Note.createNatural(NoteType.G));
});

Deno.test("that does not switches A for any other", () => {
  const note = Note.createNatural(NoteType.A);

  const newNote = Note.switchAccidentalType(note);

  expect(newNote).toEqual(Note.createNatural(NoteType.A));
});

Deno.test("generates the previous note", () => {
  const note = Note.createNatural(NoteType.D);

  const newNote = Note.previousNoteType(note);

  expect(newNote).toEqual(Note.createNatural(NoteType.C));
});

Deno.test("generates the previous note for C", () => {
  const note = Note.createNatural(NoteType.C);

  const newNote = Note.previousNoteType(note);

  expect(newNote).toEqual(Note.createNatural(NoteType.B));
});
