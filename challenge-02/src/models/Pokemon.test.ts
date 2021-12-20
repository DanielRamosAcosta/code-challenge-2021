import { expect } from "expect";
import { Pokemon } from "./Pokemon.ts";

Deno.test("that reverses the name", () => {
  const pokemon = "PIKACHU";

  const reversed = Pokemon.reverse(pokemon);

  expect(reversed).toEqual("UHCAKIP");
});
