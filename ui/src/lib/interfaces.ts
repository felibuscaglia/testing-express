export interface ICoordinates {
  lng: number;
  lat: number;
  zoom: number;
}

export interface IAPIError {
  message: string;
  errors?: string[];
}

export interface IGuardProps {
  component: () => JSX.Element;
}

// TODO: Maybe unify all API routes?
export interface ICreateMapResponse {
  mapId: string;
}

export interface IMap {
  id: string;
  name: string;
  description?: string;
}
