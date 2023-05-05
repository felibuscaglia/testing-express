import Loading from "components/Loading";
import Map from "components/Map";
import MapInfoEditor from "components/MapInfoEditor";
import { MapContext } from "contexts/MapContext";
import { API_CLIENT as apiClient } from "lib/axios/apiClient";
import { API_PATHS } from "lib/enums";
import { IMap } from "lib/interfaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MapEditor = () => {
  const [map, setMap] = useState<IMap>({} as IMap);
  const [loading, setLoading] = useState(true);
  const [selectedLayer, setSelectedLayer] = useState(0);

  const { mapId = "" } = useParams();

  useEffect(() => {
    apiClient
      .get<IMap>(`${API_PATHS.GET_MAP}?mapId=${mapId}&withLayers=1`)
      .then(({ data }) => {
        setMap(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // TODO: Handle error. Do the same as Google, show access screen.
      });
  }, []);

  if (loading) return <Loading loadingText="Getting map information" />;

  return (
    <MapContext.Provider value={{ selectedLayer, setSelectedLayer }}>
      <MapInfoEditor map={map} setMap={setMap} />
      <Map />
    </MapContext.Provider>
  );
};

export default MapEditor;
