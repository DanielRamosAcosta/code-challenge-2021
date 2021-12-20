import type { Rolls } from "./Rolls.ts";

export type Case = Rolls;

const DICE_NUMBER_FACES = 6;

export const Case = {
  getMinimumScore: (self: Case) => {
    const minimumScore = self.reduce((acc, roll) => acc + roll, 1);

    return minimumScore > DICE_NUMBER_FACES * self.length ? null : minimumScore;
  },
};
