import apiPublic from "../../../shared/api/api-public";
import type { GetStationsKeyValuePairsResponse } from "./stations.api.types";

async function getStationsKeyValuePairs(): Promise<GetStationsKeyValuePairsResponse>{
  const response = await apiPublic.get<GetStationsKeyValuePairsResponse>('/stations/all-kvs');
  return response.data;
}

const stationsApi = { getStationsKeyValuePairs };

export default stationsApi;