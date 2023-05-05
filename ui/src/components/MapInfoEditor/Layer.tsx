import { IMapLayer } from "lib/interfaces";
import { FC, useState } from "react";
import { MoreVertical, Upload } from "react-feather";

interface ILayerProps {
  layer: IMapLayer;
  isSelected: boolean;
  onClick: () => void;
}

const Layer: FC<ILayerProps> = ({ layer, isSelected, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="border-b border-main-brand-color min-h-[8rem] relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {(isSelected || hovered) && (
        <hr
          className={`absolute h-full w-1.5 ${
            isSelected ? "bg-main-brand-color" : "bg-secondary-brand-color"
          } border-none`}
        />
      )}
      <section className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <input type="checkbox" id="displayLayer" />
            <label
              className="font-title text-sm font-bold"
              htmlFor="displayLayer"
            >
              {layer.name}
            </label>
          </div>
          <MoreVertical size={21} color="#7F7F7F" />
        </div>
        <button className="flex items-center text-xs bg-main-brand-color text-white font-text px-2 py-1 border border-main-brand-color hover:bg-transparent hover:text-main-brand-color gap-1">
          <Upload size={14} /> <span>Import</span>
        </button>
        <span className="text-sm text-center w-full text-bold text-[#777777] mt-4 mb-3 inline-block underline">
          No places yet.
        </span>
      </section>
    </div>
  );
};

export default Layer;
