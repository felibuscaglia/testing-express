import SignUpModal from "components/SignUpModal";
import { BTN_CLASSNAMES } from "lib/constants";
import { useState } from "react";

const HomeScreen = () => {
  const [displaySignUpModal, setDisplaySignUpModal] = useState(false);
  return (
    <main>
      <button
        className={BTN_CLASSNAMES}
        onClick={() => setDisplaySignUpModal(true)}
      >
        Get started
      </button>
      {displaySignUpModal && (
        <SignUpModal closeModal={() => setDisplaySignUpModal(false)} />
      )}
    </main>
  );
};

export default HomeScreen;
