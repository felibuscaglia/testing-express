import { MoreVertical, PenTool } from "react-feather";
import Actions from "./Actions";
import Layer from "./Layer";

const MapInfoEditor = () => {
  return (
    <div className="bg-white w-1/5 absolute mt-7 left-10 z-10 flex flex-col">
      <div className="flex items-center justify-between p-4">
        <button>
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
      <button className="px-4 py-1.5 flex items-center text-xs bg-main-brand-color text-white font-text px-2 py-1 border-x border-b border-main-brand-color hover:bg-transparent hover:text-main-brand-color gap-1">
        <PenTool size={14} />
        <span>Change map style</span>
      </button>
    </div>
  );
};

export default MapInfoEditor;
