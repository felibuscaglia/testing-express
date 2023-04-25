import Map from "components/Map";
import MapInfoEditor from "components/MapInfoEditor";
import { API_CLIENT as apiClient } from "lib/axios/apiClient";
import { API_PATHS } from "lib/enums";
import { IMap } from "lib/interfaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MapEditor = () => {
  const [map, setMap] = useState<IMap | null>(null);
  const { mapId = "" } = useParams();

  useEffect(() => {
    apiClient
      .get<IMap>(API_PATHS.GET_MAP, { params: { mapId } })
      .then(({ data }) => setMap(data))
      .catch((err) => {
        console.error(err);
        // TODO: Handle error
      });
  }, []);

  return (
    <main>
      <MapInfoEditor />
      <Map />
    </main>
  );
};

export default MapEditor;
