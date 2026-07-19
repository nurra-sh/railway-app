import type { TrainApiMeta } from "../../stations/api/stations.api.types";

export interface TrainStation {
    code: string;
    name: string;
    nameHindi: string;
    latitude: number;
    longitude: number;
}

export interface TrainTypeFilter {
    code: string;
    description: string;
    descriptionHindi?: string;
}

export interface JourneySegment {
    from: TrainStation;
    to: TrainStation;
    departureTime: string;
    arrivalTime: string;
    travelTime: string;
}

export interface Train {
    number: string;
    name: string;
    type: string;
    nameHindi: string;
    typeDescription: string;
    typeDescriptionHindi: string;
    source: TrainStation;
    destination: TrainStation;
    runDays: string[];
    availableClasses: string[];
    journeySegment: JourneySegment;
}

export interface GetTrainsBetweenStationsData {
    fromStationCode: string;
    toStationCode: string;
    totalTrains: number;
    trainTypeFilter: TrainTypeFilter;
    trains: Train[];
}

export interface GetTrainsBetweenStationsDataWithStations {
    fromStation: TrainStation;
    toStation: TrainStation;
    totalTrains: number;
    trainTypeFilter: TrainTypeFilter;
    trains: Train[];
}

export interface GetTrainsBetweenStationsResponse {
    success: boolean;
    data: GetTrainsBetweenStationsData;
    meta: TrainApiMeta;
}