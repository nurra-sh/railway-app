import { useQuery } from "@tanstack/react-query";
import stationsApi from "../api/stations.api";
import { STATIONS_QUERY_KEYS } from "./stations.queries.types";

export default function useGetStationsKeyValuePairs(lat: number, lon: number) {
  return useQuery({
    queryKey: STATIONS_QUERY_KEYS.getKeyValuePairs(lat, lon),
    queryFn: () => stationsApi.getStations(lat, lon),
    enabled: Boolean(lat) && Boolean(lon),
  });
}