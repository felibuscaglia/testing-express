import { IAPIError } from "lib/interfaces";
import {
  Dispatch,
  ElementType,
  Fragment,
  SetStateAction,
  useState,
} from "react";
import { X } from "react-feather";
import ErrorMessage from "./ErrorMessage";

// TODO: Close button should receive an onClose function, whicnh in the Auth case should reset the option to NONE

interface IModalProps<T> {
  setDisplayModal: Dispatch<SetStateAction<boolean>>;
  component: ElementType;
  componentProps: T;
}

const Modal = <T extends {}>({
  setDisplayModal,
  component: Component,
  componentProps,
}: IModalProps<T>) => {
  const [error, setError] = useState<IAPIError | null>(null);

  return (
    <Fragment>
      <div className="absolute bg-white z-50 screen-center shadow-lg p-3 flex flex-col">
        <button className="self-end" onClick={() => setDisplayModal(false)}>
          <X
            size={25}
            className="text-gray-400 hover:text-main-brand-color cursor-pointer"
            strokeWidth={1}
          />
        </button>
        {error && (
          <ErrorMessage message={error.message} errors={error.errors} />
        )}
        {<Component setError={setError} {...componentProps} />}
      </div>
      <div className="h-screen w-screen bg-white opacity-40 absolute top-0 flex items-center justify-center z-10"></div>
    </Fragment>
  );
};

export default Modal;
