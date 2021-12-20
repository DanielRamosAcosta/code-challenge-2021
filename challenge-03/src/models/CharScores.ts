export type CharScores = Record<string, number>;

export const CharScores = {
  scoreFor: (charScores: CharScores) =>
    (char: string): number => charScores[char] ?? 0,
};
