import { useEffect, useRef, useState } from "react";
import { Search } from "react-feather";
import { MapboxGeoJSONFeature } from "mapbox-gl";
import { MAPBOX_API_CLIENT as mapboxApiClient } from "lib/axios/mapboxClient";
import { MAPBOX_API_PATHS as mapboxApiPaths } from "lib/constants";

const generateMapboxPlacesApiPath = (q: string) =>
  `${mapboxApiPaths.PLACES}${encodeURI(q)}.json`;

const PlaceSearcher = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MapboxGeoJSONFeature[]>([]);

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      searchPlaces(query);
    }, 500);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query]);

  const searchPlaces = (q: string) => {
    if (q.length) {
      const API_PATH = generateMapboxPlacesApiPath(q);
      mapboxApiClient.get(API_PATH).then(({ data }) => console.log({ data }));
    }
  };

  return (
    <div className="absolute top-7 left-10 flex items-center h-10">
      <input
        className="text-sm bg-white py-px px-2 h-full w-96 border border-white focus:border-black"
        placeholder="Search for places around the world..."
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
      <button className="bg-main-brand-color px-4 h-full">
        <Search size={20} color="white" />
      </button>
    </div>
  );
};

export default PlaceSearcher;
