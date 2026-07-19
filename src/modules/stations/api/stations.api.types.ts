export type StationKeyValuePair = readonly [code: string, name: string];

export interface TrainApiMeta {
  timestamp: string;
  traceId: string;
  executionTime: number;
  service: string;
  method: string;
}

export interface GetStationsKeyValuePairsResponse {
  success: boolean;
  data: StationKeyValuePair[];
  meta: TrainApiMeta;
}