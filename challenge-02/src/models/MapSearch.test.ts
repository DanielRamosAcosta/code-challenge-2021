import { expect } from "expect";
import { MapSearch } from "./MapSearch.ts";

Deno.test("that catch them all", () => {
  const mapSearch: MapSearch = {
    pokemons: ["SNORLAX"],
    map: "TAKECASNORLAXREWITHVENOM",
  };

  const clearedMap = MapSearch.catchAll(mapSearch);

  expect(clearedMap).toEqual("TAKECAREWITHVENOM");
});

Deno.test("that catch them all reversed", () => {
  const mapSearch: MapSearch = {
    pokemons: ["PIKACHU"],
    map: "AUHCAKIPB",
  };

  const clearedMap = MapSearch.catchAll(mapSearch);

  expect(clearedMap).toEqual("AB");
});

Deno.test("works with mixed pokemons", () => {
  const mapSearch: MapSearch = {
    pokemons: ["PIKACHU", "CHARIZARD"],
    map: "NOPOKEMUHCAKICHARIZARDPONSHERE",
  };

  const clearedMap = MapSearch.catchAll(mapSearch);

  expect(clearedMap).toEqual("NOPOKEMONSHERE");
});
