export const TRAINS_QUERY_PREFIX = 'trains';

export const TRAINS_QUERY_KEYS = {
  getTrainsBetweenStations: (departure: string, arrival: string, date: string) => [TRAINS_QUERY_PREFIX, 'getTrainsBetweenStations', departure, arrival, date],
} as const;