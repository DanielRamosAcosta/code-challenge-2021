export type Pokemon = string;

export const Pokemon = {
  reverse: (pokemon: Pokemon) => pokemon.split("").reverse().join(""),
};
