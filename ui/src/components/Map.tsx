import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM } from "lib/constants";
import mapboxgl from "mapbox-gl";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? "";

    const initializeMap = ({
      setMap,
      mapContainerRef,
    }: {
      setMap: Dispatch<SetStateAction<mapboxgl.Map | null>>;
      mapContainerRef: RefObject<HTMLDivElement>;
    }) => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [DEFAULT_LAT, DEFAULT_LNG],
        zoom: DEFAULT_ZOOM,
      });

      map.on("load", () => {
        setMap(map);
      });
    };

    if (!map) initializeMap({ setMap, mapContainerRef });
  }, [map]);

  return (
    <div>
      <div ref={mapContainerRef} className="relative h-screen" />
    </div>
  );
};

export default Map;
