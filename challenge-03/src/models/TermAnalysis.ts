import { CharScores } from "./CharScores.ts";
import { Terms } from "./Terms.ts";
import { Term } from "./Term.ts";
import { sum } from "../utils/sum.ts";

export type TermAnalysis = {
  terms: Terms;
  scores: CharScores;
};

const TermAnalysisPrivate = {
  scoreForTerm: (termAnalysis: TermAnalysis) =>
    (term: Term): number =>
      term.split("").map(CharScores.scoreFor(termAnalysis.scores)).reduce(sum),
};

export const TermAnalysis = {
  getWinnerTerm: (termAnalysis: TermAnalysis): Term | null => {
    const [term1, term2] = termAnalysis.terms;
    const computeScore = TermAnalysisPrivate.scoreForTerm(termAnalysis);

    const term1Score = computeScore(term1);
    const term2Score = computeScore(term2);

    if (term1Score === term2Score) {
      return null;
    }

    return term1Score > term2Score ? term1 : term2;
  },
};
