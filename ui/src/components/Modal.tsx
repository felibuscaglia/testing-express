import { FC, Fragment } from "react";
import { Facebook, Mail, X } from "react-feather";
import SocialLoginButton from "./SocialLoginButton";
import { ReactComponent as GoogleIcon } from "assets/icons/logo-google.svg";
import { APP_NAME } from "lib/constants";
import { Link } from "react-router-dom";

const BUTTONS = [
  {
    option: "Google",
    icon: GoogleIcon,
    iconClassnames: "fill-current",
  },
  {
    option: "Facebook",
    icon: Facebook,
  },
  {
    option: "email",
    icon: Mail,
  },
];

interface IModalProps {
  onCloseBtnClick: () => void;
}

const Modal: FC<IModalProps> = ({ onCloseBtnClick }) => {
  return (
    <Fragment>
      <div className="absolute bg-white z-10 screen-center shadow-lg p-3 flex flex-col">
        <button className="self-end" onClick={onCloseBtnClick}>
          <X
            size={25}
            className="text-gray-400 hover:text-main-brand-color cursor-pointer"
            strokeWidth={1}
          />
        </button>
        <section className="py-11 px-14 flex flex-col items-center">
          <h2 className="font-title text-3xl">Join AtlasCraft.</h2>
          <div className="flex flex-col items-center gap-3 mt-16 mb-8">
            {BUTTONS.map(({ option, icon, iconClassnames }) => (
              <SocialLoginButton
                option={option}
                icon={icon}
                iconClassnames={iconClassnames}
              />
            ))}
          </div>
          <span className="font-title mb-16">
            Already have an account?{" "}
            <a className="underline font-bold cursor-pointer">Sign in</a>
          </span>
          <p className="text-sm text-gray-400 text-center">
            Click “Sign Up” to agree to {APP_NAME}'s{" "}
            <Link to="/terms-of-service" className="underline">Terms of Service</Link> and acknowledge that {APP_NAME}'s
            <Link to="/privacy-policy" className="underline">Privacy Policy</Link> applies to you.
          </p>
        </section>
      </div>
      <div className="h-screen w-screen bg-white opacity-40 absolute top-0 flex items-center justify-center z-0"></div>
    </Fragment>
  );
};

export default Modal;
