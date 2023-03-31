import { MoreVertical, Upload } from "react-feather";

const Layer = () => {
  return (
    <div className="border-b border-main-brand-color px-4 py-3 min-h-[8rem]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <input type="checkbox" id="displayLayer" />
          <label className="font-title text-sm font-bold" htmlFor="displayLayer">Unnamed layer</label>
        </div>
        <MoreVertical size={21} color="#7F7F7F" />
      </div>
      <button className="flex items-center text-xs bg-main-brand-color text-white font-text px-2 py-1 border border-main-brand-color hover:bg-transparent hover:text-main-brand-color gap-1">
        <Upload size={14} /> <span>Import</span>
      </button>
      <span className="text-sm text-center w-full text-bold text-[#777777] mt-8 inline-block underline">
        No places yet.
      </span>
    </div>
  );
};

export default Layer;
