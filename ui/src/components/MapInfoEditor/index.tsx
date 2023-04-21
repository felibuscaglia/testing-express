import Modal from "components/Modal";
import { SELECTED_MAP_INFO_EDITOR_COMPONENTS } from "lib/constants";
import { MAP_INFO_EDITORS } from "lib/enums";
import { Fragment, useState } from "react";
import { MoreVertical, PenTool } from "react-feather";
import Actions from "./Actions";
import Layer from "./Layer";

const MapInfoEditor = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [
    selectedMapInfoEditor,
    setSelectedMapInfoEditor,
  ] = useState<MAP_INFO_EDITORS | null>(null);

  const handleOpenModal = (mapInfoEditor: MAP_INFO_EDITORS) => {
    setDisplayModal(true);
    setSelectedMapInfoEditor(mapInfoEditor);
  };

  return (
    <Fragment>
      <div className="bg-white w-1/5 absolute mt-7 left-10 z-10 flex flex-col">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => handleOpenModal(MAP_INFO_EDITORS.TITLE)}>
            <h2 className="font-title font-bold text-main-brand-color">
              Lugares que hay que visitar
            </h2>
          </button>
          <button>
            <MoreVertical size={21} color="#7F7F7F" />
          </button>
        </div>
        <div className="text-xs flex flex-col gap-y-1 text-[#777777] px-4">
          <span>4 views</span>
          <span>Last change was made 2 days ago</span>
        </div>
        <Actions />
        <Layer />
        <button className="px-4 py-1.5 flex items-center text-xs bg-main-brand-color text-white font-text border-x border-b border-main-brand-color hover:bg-transparent hover:text-main-brand-color gap-1">
          <PenTool size={14} />
          <span>Change map style</span>
        </button>
      </div>
      {displayModal && (
        <Modal<any> // TODO: CHANGE
          setDisplayModal={setDisplayModal}
          component={
            SELECTED_MAP_INFO_EDITOR_COMPONENTS[
              selectedMapInfoEditor ?? MAP_INFO_EDITORS.TITLE
            ]
          }
          componentProps={{}}
        />
      )}
    </Fragment>
  );
};

export default MapInfoEditor;
