export interface ICoordinates {
    lng: number;
    lat: number;
    zoom: number;
}

export interface IAPIError {
    message: string;
    errors?: string[];
}