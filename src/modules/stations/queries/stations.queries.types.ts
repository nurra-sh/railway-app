export const STATIONS_QUERY_PREFIX = 'stations';

export const STATIONS_QUERY_KEYS = {
  getKeyValuePairs: (lat: number, lon: number) => [STATIONS_QUERY_PREFIX, 'getKeyValuePairs', lat, lon],
} as const;