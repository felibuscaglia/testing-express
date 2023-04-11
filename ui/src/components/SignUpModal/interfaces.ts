import EmailSignUpOption from "./Email";
import SplashSignUpModal from "./SplashOption";

export enum SIGN_UP_OPTION {
  NONE = "",
  EMAIL = "email",
  FACEBOOK = "Facebook",
  GOOGLE = "Google",
}

export interface IModalProps {
  closeModal: () => void;
}

export interface ISelectedComponentProps {
  setSelectedOption: (option: SIGN_UP_OPTION) => void;
}

export const SELECTED_OPTION_COMPONENT = {
  [SIGN_UP_OPTION.NONE]: SplashSignUpModal,
  [SIGN_UP_OPTION.EMAIL]: EmailSignUpOption,
  [SIGN_UP_OPTION.FACEBOOK]: EmailSignUpOption, // Change
  [SIGN_UP_OPTION.GOOGLE]: EmailSignUpOption, // Change
};
