import { MapSearch } from "../models/MapSearch.ts";
import { MapSearches } from "../models/MapSearches.ts";

export class MapSearchParser {
  private static parseDescription(description: string) {
    const matches = description.match(/(\d+) (\d+) (\d+)/);

    if (!matches) {
      throw new Error("Invalid map search description");
    }

    const [, numberOfPokemonsToFindStr, numberOfRowsStr] = matches;

    const [numberOfPokemonsToFind, numberOfRows] = [
      parseInt(numberOfPokemonsToFindStr),
      parseInt(numberOfRowsStr),
    ];

    return {
      numberOfPokemonsToFind,
      numberOfRows,
    };
  }

  private static parseCases(cases: string[]): MapSearches {
    const [description, ...rest] = cases;

    if (!description) {
      return [];
    }

    const { numberOfPokemonsToFind, numberOfRows } = MapSearchParser
      .parseDescription(description);

    const pokemonsToFind = rest.slice(0, numberOfPokemonsToFind);
    const map = rest.slice(
      numberOfPokemonsToFind,
      numberOfPokemonsToFind + numberOfRows,
    );
    const otherCases = rest.slice(numberOfPokemonsToFind + numberOfRows);

    const mapSearch: MapSearch = {
      pokemons: pokemonsToFind,
      map: map.map((row) => row.replace(/ /g, "")).join(""),
    };

    return [mapSearch, ...MapSearchParser.parseCases(otherCases)];
  }

  public static parseFromFile(file: string): MapSearches {
    const [, ...cases] = file.split("\n");

    return MapSearchParser.parseCases(cases);
  }
}
