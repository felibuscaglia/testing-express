import { FC, Fragment, useState } from "react";
import { X } from "react-feather";
import { IModalProps, SIGN_UP_OPTION, SELECTED_OPTION_COMPONENT } from "./interfaces";

const Modal: FC<IModalProps> = ({ closeModal }) => {
  const [selectedOption, setSelectedOption] = useState(SIGN_UP_OPTION.NONE);

  const SelectedComponent = SELECTED_OPTION_COMPONENT[selectedOption];

  return (
    <Fragment>
      <div className="absolute bg-white z-10 screen-center shadow-lg p-3 flex flex-col min-h-[523px]">
        <button className="self-end" onClick={closeModal}>
          <X
            size={25}
            className="text-gray-400 hover:text-main-brand-color cursor-pointer"
            strokeWidth={1}
          />
        </button>
        {<SelectedComponent setSelectedOption={setSelectedOption} />}
      </div>
      <div className="h-screen w-screen bg-white opacity-40 absolute top-0 flex items-center justify-center z-0"></div>
    </Fragment>
  );
};

export default Modal;
