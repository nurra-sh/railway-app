export const TRAINS_QUERY_PREFIX = 'trains';

export const TRAINS_QUERY_KEYS = {
  getTrainsBetweenStations: (departure: string, arrival: string) => [TRAINS_QUERY_PREFIX, 'getTrainsBetweenStations', departure, arrival],
} as const;