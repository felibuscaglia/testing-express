import { Menu } from "react-feather";
import UserMenu from "./UserMenu";

const PageHead = () => {
  return (
    <header className="flex items-center justify-between bg-main-brand-color text-white py-4">
      <section className="flex items-center gap-4 ml-4">
        <button className="mt-1">
          {/*TODO: Make this work */}
          <Menu size={25} />
        </button>
        <h1 className="text-3xl text-white">AtlasCraft</h1>
      </section>
      <UserMenu />
    </header>
  );
};

export default PageHead;
