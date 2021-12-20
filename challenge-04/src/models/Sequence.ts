import { Distance, fromString } from "./Distance.ts";

export type Sequence = Distance[];

export const Sequence = {
  create: (distances: Distance[]): Sequence => distances,
  createIonian: (): Sequence =>
    Sequence.create([
      Distance.TONE,
      Distance.TONE,
      Distance.SEMITONE,
      Distance.TONE,
      Distance.TONE,
      Distance.TONE,
      Distance.SEMITONE,
    ]),
  createDorian: (): Sequence =>
    Sequence.create([
      Distance.TONE,
      Distance.SEMITONE,
      Distance.TONE,
      Distance.TONE,
      Distance.SEMITONE,
      Distance.TONE,
      Distance.TONE,
    ]),
  createLydian: (): Sequence =>
    Sequence.create([
      Distance.TONE,
      Distance.TONE,
      Distance.TONE,
      Distance.SEMITONE,
      Distance.TONE,
      Distance.TONE,
      Distance.SEMITONE,
    ]),
  createMixolydian: (): Sequence =>
    Sequence.create([
      Distance.TONE,
      Distance.TONE,
      Distance.SEMITONE,
      Distance.TONE,
      Distance.TONE,
      Distance.SEMITONE,
      Distance.TONE,
    ]),
  createAeolian: (): Sequence =>
    Sequence.create([
      Distance.TONE,
      Distance.SEMITONE,
      Distance.TONE,
      Distance.TONE,
      Distance.SEMITONE,
      Distance.TONE,
      Distance.TONE,
    ]),
  createLocrian: (): Sequence =>
    Sequence.create([
      Distance.SEMITONE,
      Distance.TONE,
      Distance.TONE,
      Distance.SEMITONE,
      Distance.TONE,
      Distance.TONE,
      Distance.TONE,
    ]),
  fromString: (str: string): Sequence =>
    Sequence.create(str.split("").map(fromString)),
};
