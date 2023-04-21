import { ReactNode } from "react";

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
