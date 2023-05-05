import Modal from "components/Modal";
import {
  SELECTED_MAP_INFO_EDITOR_COMPONENTS,
  UNEXPECTED_ERROR_MESSAGE,
} from "lib/constants";
import { API_PATHS, MAP_INFO_EDITORS } from "lib/enums";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { MoreVertical, PenTool } from "react-feather";
import Actions from "./Actions";
import Layer from "./Layer";
import {
  IMap,
  IMapInfoEditorComponentProps,
  IMapInput,
  IMapLayer,
} from "lib/interfaces";
import SavingIndicator from "./SavingIndicator";
import { API_CLIENT as apiClient } from "lib/axios/apiClient";
import { showToastWithErrorMessage } from "lib/helpers";
import { Toaster } from "react-hot-toast";
import { MapContext } from "contexts/MapContext";

// TODO: Trunc description

interface IMapInfoEditorProps {
  map: IMap;
  setMap: (map: IMap) => void;
}

const MapInfoEditor: FC<IMapInfoEditorProps> = ({ map, setMap }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedMapInfoEditor, setSelectedMapInfoEditor] =
    useState<MAP_INFO_EDITORS | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date(map.updatedAt));
  const [mapLayers, setMapLayers] = useState(map.layers);
  const [loadingChanges, setLoadingChanges] = useState<boolean | null>(null);

  const { selectedLayer, setSelectedLayer } = useContext(MapContext);

  const handleOpenModal = (mapInfoEditor: MAP_INFO_EDITORS) => {
    setDisplayModal(true);
    setSelectedMapInfoEditor(mapInfoEditor);
  };

  useEffect(() => {
    let intervalId: number;
    const diffMs = new Date().getTime() - updatedAt.getTime();
    const minutesAgo = Math.floor(diffMs / 1000 / 60);

    if (minutesAgo < 60) {
      intervalId = window.setInterval(() => {
        setUpdatedAt(new Date(map.updatedAt));
      }, 60 * 1000); // Update every minute
    } else if (minutesAgo < 24 * 60) {
      intervalId = window.setInterval(() => {
        setUpdatedAt(new Date(map.updatedAt));
      }, 60 * 60 * 1000); // Update every hour
    } else {
      // No need to update if it's been more than a day
      return;
    }

    return () => clearInterval(intervalId);
  }, [updatedAt]);

  const patchMap = (input: IMapInput) => {
    setLoadingChanges(true);
    setMap({
      ...map,
      name: input.name,
      description: input.description,
    });
    setDisplayModal(false);

    apiClient
      .patch(`${API_PATHS.PATCH_MAP}?mapId=${map.id}`, input)
      .then(() => {
        setLoadingChanges(false);
        setUpdatedAt(new Date());
      })
      .catch((err) => {
        let errorMessage = UNEXPECTED_ERROR_MESSAGE;

        if (err.response) {
          const { data } = err.response;
          errorMessage = data.message;
        }

        showToastWithErrorMessage(errorMessage);
        setLoadingChanges(false);
      }); // TODO: Handle error in the LoadingIndicator component.
  };

  const addMapLayer = (mapLayer: IMapLayer) => {
    setMapLayers([...mapLayers, mapLayer]);
  };

  return (
    <Fragment>
      <div className="bg-white w-1/5 absolute mt-7 left-10 z-10 flex flex-col">
        <div className="flex items-center justify-between p-4">
          <button
            className="text-left"
            onClick={() => handleOpenModal(MAP_INFO_EDITORS.TITLE)}
          >
            <h2 className="font-title font-bold text-main-brand-color">
              {map.name}
            </h2>
            {map.description && (
              <p className=" text-gray-400 text-xs mt-4">{map.description}</p>
            )}
          </button>
          <button>
            <MoreVertical size={21} color="#7F7F7F" />
          </button>
        </div>
        <div className="text-xs flex flex-col gap-y-1 text-gray-400 px-4">
          <SavingIndicator
            updatedAt={updatedAt}
            loadingChanges={loadingChanges}
          />
        </div>
        <Actions
          setLoadingChanges={setLoadingChanges}
          mapId={map.id}
          addMapLayer={addMapLayer}
        />
        {mapLayers?.map((layer, i) => (
          <Layer
            layer={layer}
            isSelected={i === selectedLayer}
            key={`maplayer-${layer.id}`}
            onClick={() => setSelectedLayer(i)}
          />
        ))}
        <button className="px-4 py-1.5 flex items-center text-xs bg-main-brand-color text-white font-text border-x border-b border-main-brand-color hover:bg-transparent hover:text-main-brand-color gap-1">
          <PenTool size={14} />
          <span>Change map style</span>
        </button>
      </div>
      {displayModal && (
        <Modal<IMapInfoEditorComponentProps>
          setDisplayModal={setDisplayModal}
          component={
            SELECTED_MAP_INFO_EDITOR_COMPONENTS[
              selectedMapInfoEditor ?? MAP_INFO_EDITORS.TITLE
            ]
          }
          componentProps={{
            setDisplayModal,
            patchMap,
            map,
          }}
        />
      )}
      <Toaster />
    </Fragment>
  );
};

export default MapInfoEditor;
