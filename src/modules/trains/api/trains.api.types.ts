export interface TrainsSearchStation {
    type: string;
    title: string;
    short_title: string | null;
    popular_title: string | null;
    code: string;
    station_type: string;
    station_type_name: string;
    transport_type: string;
  }
  
  export interface TrainsSearchCriteria {
    from: TrainsSearchStation;
    to: TrainsSearchStation;
    date: string | null;
  }
  
  export interface TrainCarrierCodes {
    sirena: string | null;
    iata: string | null;
    icao: string | null;
  }
  
  export interface TrainCarrier {
    code: number;
    title: string;
    codes: TrainCarrierCodes;
    address: string;
    url: string;
    email: string;
    contacts: string;
    phone: string;
    logo: string | null;
    logo_svg: string | null;
  }
  
  export interface TrainTransportSubtype {
    title: string | null;
    code: string | null;
    color: string | null;
  }
  
  export interface TrainThread {
    number: string;
    title: string;
    short_title: string;
    express_type: string | null;
    transport_type: string;
    carrier: TrainCarrier;
    uid: string;
    vehicle: unknown | null;
    transport_subtype: TrainTransportSubtype;
    thread_method_link: string;
  }
  
  export interface TrainScheduleSegment {
    thread: TrainThread;
    stops: string;
    from: TrainsSearchStation;
    to: TrainsSearchStation;
    departure_platform: string;
    arrival_platform: string;
    departure_terminal: string | null;
    arrival_terminal: string | null;
    duration: number;
    days: string;
    except_days: string;
    departure: string;
    arrival: string;
    start_date: string;
  }
  
  export interface TrainsSearchPagination {
    total: number;
    limit: number;
    offset: number;
  }
  
  /** Root response body for GET /search (Yandex Rasp API) */
  export interface GetTrainsBetweenStationsResponse {
    search: TrainsSearchCriteria;
    segments: TrainScheduleSegment[];
    interval_segments: unknown[];
    pagination: TrainsSearchPagination;
  }