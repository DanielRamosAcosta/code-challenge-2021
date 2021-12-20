import { Case } from "./Case.ts";

export type Cases = Case[];

export const Cases = {
  getMinimumScore: (cases: Cases) => cases.map(Case.getMinimumScore),
};
