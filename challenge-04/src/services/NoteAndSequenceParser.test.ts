import { expect } from "expect";
import { Note } from "../models/Note.ts";
import { NoteType } from "../models/NoteType.ts";
import { Sequence } from "../models/Sequence.ts";
import { NoteAndSequenceParser } from "./NoteAndSequenceParser.ts";

Deno.test("that parses a single note and sequence", () => {
  const file = `1
G
TTTsTTs`;

  const scalesParams = NoteAndSequenceParser.parseFromFile(file);

  expect(scalesParams).toEqual([
    {
      note: Note.createNatural(NoteType.G),
      sequence: Sequence.createLydian(),
    },
  ]);
});

Deno.test("that parses a two notess and sequences", () => {
  const file = `2
G
TTTsTTs
A
sTTsTTT`;

  const scalesParams = NoteAndSequenceParser.parseFromFile(file);

  expect(scalesParams).toEqual([
    {
      note: Note.createNatural(NoteType.G),
      sequence: Sequence.createLydian(),
    },
    {
      note: Note.createNatural(NoteType.A),
      sequence: Sequence.createLocrian(),
    },
  ]);
});

Deno.test("that parses notes with flats", () => {
  const file = `1
Db
TTsTTTs`;

  const scalesParams = NoteAndSequenceParser.parseFromFile(file);

  expect(scalesParams).toEqual([
    {
      note: Note.createFlat(NoteType.D),
      sequence: Sequence.createIonian(),
    },
  ]);
});
