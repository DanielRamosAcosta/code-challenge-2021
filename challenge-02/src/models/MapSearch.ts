import { PokeMap } from "./PokeMap.ts";
import { Pokemon } from "./Pokemon.ts";
import { Pokemons } from "./Pokemons.ts";

export type MapSearch = {
  pokemons: Pokemons;
  map: PokeMap;
};

export const MapSearch = {
  clearPokemon(map: PokeMap, pokemon: Pokemon): string {
    return map.replace(pokemon, "").replace(Pokemon.reverse(pokemon), "");
  },

  catchAll({ map, pokemons }: MapSearch): PokeMap {
    const clearedMap = pokemons.reduce(MapSearch.clearPokemon, map);

    return clearedMap.length < map.length
      ? MapSearch.catchAll({ pokemons, map: clearedMap })
      : map;
  },
};
