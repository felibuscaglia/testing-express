import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
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
import { Search } from "react-feather";
import ReactDOMServer from "react-dom/server";

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

  const geocoderContainer = document.createElement("div");
  geocoderContainer.className = "flex items-center mt-7 absolute left-1/4 w-4/12";

  const searchBtn = document.createElement("button");
  searchBtn.className = "h-10 bg-main-brand-color px-4 relative";
  const searchIconHTML = ReactDOMServer.renderToString(
    <Search size={20} color="white" />
  );
  searchBtn.innerHTML = searchIconHTML;


  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: "Search for places around the world",
  });

  //TODO: Loader

  map.on("load", () => {
    setMap(map);
    geocoderContainer.appendChild(geocoder.onAdd(map));
    map.getContainer().appendChild(geocoderContainer);
    geocoderContainer.appendChild(searchBtn);
  });
};

const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? "";

    if (!map) initializeMap({ setMap, mapContainerRef });
  }, [map]);

  return <div ref={mapContainerRef} className="relative h-screen" />;
};

export default Map;
