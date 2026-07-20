export type StationKeyValuePair = readonly [code: string, name: string];

export interface NearestStationsPagination {
  total: number;
  limit: number;
  offset: number;
}

export interface NearestStationTypeChoiceUrls {
  desktop?: string;
  mobile?: string;
}

export interface NearestStationTypeChoices {
  schedule?: NearestStationTypeChoiceUrls;
  train?: NearestStationTypeChoiceUrls;
  tablo?: NearestStationTypeChoiceUrls;
  [key: string]: NearestStationTypeChoiceUrls | undefined;
}

export interface NearestStation {
  code: string;
  title: string;
  station_type: string;
  station_type_name?: string;
  transport_type: string;
  distance: number;
  majority: number;
  lat: number;
  lng: number;
  type: string;
  type_choices?: NearestStationTypeChoices;
}

/** Response body for GET /nearest_stations (Yandex Rasp API) */
export interface GetNearestStationsResponse {
  pagination: NearestStationsPagination;
  stations: NearestStation[];
}

export interface TrainApiMeta {
  timestamp: string;
  traceId: string;
  executionTime: number;
  service: string;
  method: string;
}