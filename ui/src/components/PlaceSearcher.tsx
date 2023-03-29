import { Search } from "react-feather";

const PlaceSearcher = () => {
  return (
    <div className="absolute top-7 left-10 flex items-center h-10">
      <input
        className="text-sm bg-white py-px px-2 h-full w-96 border border-white focus:border-black"
        placeholder="Search for places around the world..."
      />
      <button className="bg-main-brand-color px-4 h-full">
        <Search size={20} color="white" />
      </button>
    </div>
  );
};

export default PlaceSearcher;
