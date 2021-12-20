import { MapSearch } from "./MapSearch.ts";

export type MapSearches = MapSearch[];

export const MapSearches = {
  search: (mapSearches: MapSearches) => mapSearches.map(MapSearch.catchAll),
};
