import { expect } from "expect";
import { MapSearchParser } from "./MapSearchParser.ts";

Deno.test("parses a file with one case", () => {
  const file = `1
1 4 6
SNORLAX
T A K E C A
S N O R L A
X R E W I T
H V E N O M`;

  const cases = MapSearchParser.parseFromFile(file);

  expect(cases).toEqual([
    {
      pokemons: ["SNORLAX"],
      map: "TAKECASNORLAXREWITHVENOM",
    },
  ]);
});

Deno.test("parses a file with one cases", () => {
  const file = `2
1 4 6
SNORLAX
T A K E C A
S N O R L A
X R E W I T
H V E N O M
2 3 10
PIKACHU
CHARIZARD
N O P O K E M U H C
A K I C H A R I Z A
R D P O N S H E R E`;

  const cases = MapSearchParser.parseFromFile(file);

  expect(cases).toEqual([
    {
      pokemons: ["SNORLAX"],
      map: "TAKECASNORLAXREWITHVENOM",
    },
    {
      pokemons: ["PIKACHU", "CHARIZARD"],
      map: "NOPOKEMUHCAKICHARIZARDPONSHERE",
    },
  ]);
});

Deno.test("that throws an error if given a wrong description", () => {
  const file = "1\na b c";

  expect(() => MapSearchParser.parseFromFile(file)).toThrow(
    "Invalid map search description",
  );
});
