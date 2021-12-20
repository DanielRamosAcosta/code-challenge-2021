import { Term } from "./Term.ts";

export type Terms = [Term, Term];

export const Terms = {
  isTerms: (data: string[]): data is Terms => data.length === 2,
};
