import Modal from "components/Modal";
import { SELECTED_MAP_INFO_EDITOR_COMPONENTS } from "lib/constants";
import { MAP_INFO_EDITORS } from "lib/enums";
import { Fragment, useContext, useEffect, useState } from "react";
import { MoreVertical, PenTool } from "react-feather";
import Actions from "./Actions";
import Layer from "./Layer";
import { IMapInfoEditorComponentProps } from "lib/interfaces";
import { SELECTED_MAP_CONTEXT } from "contexts/SelectedMapContext";
import SavingIndicator from "./SavingIndicator";

// TODO: Trunc description

const MapInfoEditor = () => {
  const { map } = useContext(SELECTED_MAP_CONTEXT);
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedMapInfoEditor, setSelectedMapInfoEditor] =
    useState<MAP_INFO_EDITORS | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date(map.updatedAt));
  const [loadingChanges, setLoadingChanges] = useState<boolean | null>(null);

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
          <span>4 views</span>
          <SavingIndicator
            updatedAt={updatedAt}
            loadingChanges={loadingChanges}
          />
        </div>
        <Actions />
        <Layer />
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
            setUpdatedAt,
            setLoadingChanges
          }}
        />
      )}
    </Fragment>
  );
};

export default MapInfoEditor;
