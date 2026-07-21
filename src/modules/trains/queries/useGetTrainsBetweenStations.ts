import { useQuery } from "@tanstack/react-query";
import trainsApi from "../api/trains.api";
import { TRAINS_QUERY_KEYS } from "./trains.queries.types";

export default function useGetTrainsBetweenStations(departure: string, arrival: string, date: string) {
  return useQuery({
    queryKey: TRAINS_QUERY_KEYS.getTrainsBetweenStations(departure, arrival, date),
    queryFn: () => trainsApi.getTrainsBetweenStations(departure, arrival, date),
    enabled: Boolean(departure) && Boolean(arrival) && Boolean(date),
  });
}