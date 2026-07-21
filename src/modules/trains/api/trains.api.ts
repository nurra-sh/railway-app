import apiPublic from "../../../shared/api/api-public";
import type { GetTrainsBetweenStationsResponse } from "./trains.api.types";

async function getTrainsBetweenStations(departure: string, arrival: string, date: string): Promise<GetTrainsBetweenStationsResponse> {
    const response = await apiPublic.get<GetTrainsBetweenStationsResponse>('/search', {
        params: {
            date,
            from: departure,
            to: arrival,
            transport_types: 'train',
            limit: 100,
        },
    });
    return response.data;
}

const trainsApi = { getTrainsBetweenStations }

export default trainsApi