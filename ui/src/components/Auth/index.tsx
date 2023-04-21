import Modal from "components/Modal";
import { BTN_CLASSNAMES, SECONDARY_BTN_CLASSNAMES } from "lib/constants";
import { useState } from "react";
import {
  SELECTED_OPTION_COMPONENT,
  SIGN_UP_OPTION,
  ISelectedComponentProps,
  AUTH_OPTION,
} from "./interfaces";
import { AUTH_CONTEXT as AuthContext } from "contexts/AuthContext";

// TODO: Other options besides Email.

const AuthComponent = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [authOption, setAuthOption] = useState<AUTH_OPTION | null>(null);
  const [selectedOption, setSelectedOption] = useState(SIGN_UP_OPTION.NONE);

  const handleBtnClick = (authOption: AUTH_OPTION) => {
    setAuthOption(authOption);
    setDisplayModal(true);
  };

  const isSignIn = authOption === AUTH_OPTION.SIGN_IN;

  return (
    <AuthContext.Provider
      value={{ signText: isSignIn ? "Sign in" : "Sign up", isSignIn }}
    >
      <button
        className={BTN_CLASSNAMES}
        onClick={() => handleBtnClick(AUTH_OPTION.SIGN_UP)}
      >
        Get started
      </button>
      <button
        className={SECONDARY_BTN_CLASSNAMES}
        onClick={() => handleBtnClick(AUTH_OPTION.SIGN_IN)}
      >
        Sign in
      </button>
      {displayModal && (
        <Modal<Omit<ISelectedComponentProps, "setError">>
          setDisplayModal={setDisplayModal}
          component={SELECTED_OPTION_COMPONENT[selectedOption]}
          componentProps={{
            setSelectedOption,
          }}
        />
      )}
    </AuthContext.Provider>
  );
};

export default AuthComponent;
