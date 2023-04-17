import Modal from "components/Modal";
import { BTN_CLASSNAMES } from "lib/constants";
import { Fragment, useState } from "react";
import {
  SELECTED_OPTION_COMPONENT,
  SIGN_UP_OPTION,
  ISelectedComponentProps,
} from "./interfaces";

const SignUp = ({}) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(SIGN_UP_OPTION.NONE);

  const SelectedComponent = SELECTED_OPTION_COMPONENT[selectedOption];

  return (
    <Fragment>
      <button className={BTN_CLASSNAMES} onClick={() => setDisplayModal(true)}>
        Get started
      </button>
      {displayModal && (
        <Modal<Omit<ISelectedComponentProps, "setError">>
          closeModal={() => setDisplayModal(false)}
          component={SelectedComponent}
          componentProps={{ setSelectedOption }}
        />
      )}
    </Fragment>
  );
};

export default SignUp;
