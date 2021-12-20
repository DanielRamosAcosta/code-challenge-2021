import { expect } from "expect";
import { TermAnalysis } from "./TermAnalysis.ts";

Deno.test("that finds the term with highest score", () => {
  const termAnalysis: TermAnalysis = {
    terms: ["love", "hate"],
    scores: {
      a: 2,
      e: 4,
      h: 3,
      l: 5,
      o: 1,
      t: 6,
      v: 0,
    },
  };

  const winnerTerm = TermAnalysis.getWinnerTerm(termAnalysis);

  expect(winnerTerm).toBe("hate");
});

Deno.test("that returns null if terms have the same score", () => {
  const termAnalysis: TermAnalysis = {
    terms: ["lose", "find"],
    scores: {
      d: 3,
      e: 0,
      f: 5,
      i: 2,
      l: 1,
      n: 4,
      o: 7,
      s: 6,
    },
  };

  const winnerTerm = TermAnalysis.getWinnerTerm(termAnalysis);

  expect(winnerTerm).toBeNull();
});
