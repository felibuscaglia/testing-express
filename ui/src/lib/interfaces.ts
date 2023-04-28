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

export interface IMapLayer {
  id: number;
  name: string;
}

export interface IMap {
  id: string;
  name: string;
  description?: string;
  updatedAt: string;
  layers: IMapLayer[];
}

export interface IMapInput {
  name: string;
  description?: string;
}

export interface IMapInfoEditorComponentProps {
  setDisplayModal: (display: boolean) => void;
  patchMap: (map: IMapInput) => void;
  map: IMap;
}
