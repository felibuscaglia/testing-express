import { IAPIError } from "lib/interfaces";
import EmailSignUpOption from "./EmailOption";
import SplashSignUpModal from "./SplashOption";

export enum AUTH_OPTION {
  SIGN_IN,
  SIGN_UP,
}

export enum SIGN_UP_OPTION {
  NONE = "",
  EMAIL = "email",
  FACEBOOK = "Facebook",
  GOOGLE = "Google",
}

export interface ISelectedComponentProps {
  setSelectedOption: (option: SIGN_UP_OPTION) => void;
  setError: (apiError: IAPIError | null) => void;
}

export const SELECTED_OPTION_COMPONENT = {
  [SIGN_UP_OPTION.NONE]: SplashSignUpModal,
  [SIGN_UP_OPTION.EMAIL]: EmailSignUpOption,
  [SIGN_UP_OPTION.FACEBOOK]: EmailSignUpOption, // Change
  [SIGN_UP_OPTION.GOOGLE]: EmailSignUpOption, // Change
};
