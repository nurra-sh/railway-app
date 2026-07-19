import { useQuery } from "@tanstack/react-query";
import stationsApi from "../api/stations.api";
import { STATIONS_QUERY_KEYS } from "./stations.queries.types";

export default function useGetStationsKeyValuePairs() {
  return useQuery({
    queryKey: STATIONS_QUERY_KEYS.getKeyValuePairs,
    queryFn: stationsApi.getStationsKeyValuePairs,
  });
}