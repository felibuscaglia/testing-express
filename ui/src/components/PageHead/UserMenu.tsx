// TODO: Implementation

import { User } from "react-feather";

const UserMenu = () => {
  return (
    <div className="mr-4 items-center flex justify-center">
      <button className="border-2 border-white p-1 rounded-full hover:bg-white hover:text-main-brand-color">
        <User size={25} />
      </button>
    </div>
  );
};

export default UserMenu;
