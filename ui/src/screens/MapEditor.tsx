import Map from "components/Map";
import PlaceSearcher from "components/PlaceSearcher";

const MapEditor = () => {
  return (
    <div>
      <Map />
      <div>
        <PlaceSearcher />
      </div>
    </div>
  );
};

export default MapEditor;
