import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM } from "lib/constants";
import { ICoordinates } from "lib/interfaces";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? "";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [coordinates, setCoordinates] = useState<ICoordinates>({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: DEFAULT_ZOOM,
  });

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current as HTMLElement,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [coordinates.lng, coordinates.lat],
        zoom: coordinates.zoom,
      });
    }
  });

  return (
      <div className="w-full h-screen bg-black">
          <div ref={mapContainer} className="h-screen" />
      </div>
  )
};

export default Map;
