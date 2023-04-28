import { IMap } from "lib/interfaces";
import { createContext } from "react";

interface ISelectedMapContext {
  map: IMap;
  setMap: (updatedMap: IMap) => void;
}

export const SELECTED_MAP_CONTEXT = createContext<ISelectedMapContext>({
  map: {} as IMap,
  setMap: (updatedMap: IMap) => {},
});
