import apiPublic from "../../../shared/api/api-public";
import type { GetTrainsBetweenStationsResponse } from "./trains.api.types";

async function getTrainsBetweenStations(departure: string, arrival: string): Promise<GetTrainsBetweenStationsResponse> {
    const response = await apiPublic.get<GetTrainsBetweenStationsResponse>('/trains/between-stations', {
        params: {
            from: departure,
            to: arrival,
        },
    });
    return response.data;
}

const trainsApi = { getTrainsBetweenStations }

export default trainsApi