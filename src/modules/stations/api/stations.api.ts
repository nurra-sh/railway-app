import apiPublic from "../../../shared/api/api-public";
import type {
  GetNearestStationsResponse,
} from "./stations.api.types";

async function getStations(lat: number, lng: number ): Promise<GetNearestStationsResponse> {
  const response = await apiPublic.get<GetNearestStationsResponse>('/nearest_stations', {
    params: {
      lat,
      lng,
      limit: 50,
      distance: 50,
      transport_types: 'train',
      station_types: 'train_station'
    }
  });
  return response.data;
}


const stationsApi = { getStations };

export default stationsApi;