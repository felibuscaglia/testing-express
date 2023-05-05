import { createContext } from "react";

interface IMapContext {
  selectedLayer: number;
  setSelectedLayer: React.Dispatch<React.SetStateAction<number>>;
}

export const MapContext = createContext<IMapContext>({
  selectedLayer: 0,
  setSelectedLayer: () => {},
});
