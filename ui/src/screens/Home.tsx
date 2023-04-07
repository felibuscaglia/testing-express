import Modal from "components/Modal";
import { useState } from "react";

const HomeScreen = () => {
  const [displaySignUpModal, setDisplaySignUpModal] = useState(false);
  return (
    <main>
      <button
        className="text-sm bg-main-brand-color border border-main-brand-color py-2 px-4 text-white rounded-full hover:bg-transparent hover:text-main-brand-color"
        onClick={() => setDisplaySignUpModal(true)}
      >
        Get started
      </button>
      {displaySignUpModal && <Modal onCloseBtnClick={() => setDisplaySignUpModal(false)} />}
    </main>
  );
};

export default HomeScreen;
