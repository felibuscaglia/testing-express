import { APP_NAME } from "lib/constants";
import { Link } from "react-router-dom";
import SocialLoginButton from "./SocialLoginButton";
import { ReactComponent as GoogleIcon } from "assets/icons/logo-google.svg";
import { Facebook, Mail } from "react-feather";
import { FC } from "react";
import { ISelectedComponentProps, SIGN_UP_OPTION } from "../interfaces";

const SplashSignUpModal: FC<ISelectedComponentProps> = ({
  setSelectedOption,
}) => {
  const BUTTONS = [
    {
      option: SIGN_UP_OPTION.GOOGLE,
      icon: GoogleIcon,
      iconClassnames: "fill-current",
    },
    {
      option: SIGN_UP_OPTION.FACEBOOK,
      icon: Facebook,
    },
    {
      option: SIGN_UP_OPTION.EMAIL,
      icon: Mail,
    },
  ];

  return (
    <section className="py-11 px-14 flex flex-col items-center">
      <h2 className="text-3xl">Join AtlasCraft.</h2>
      <div className="flex flex-col items-center gap-3 mt-16 mb-8">
        {BUTTONS.map(({ option, icon, iconClassnames }) => (
          <SocialLoginButton
            option={option}
            icon={icon}
            iconClassnames={iconClassnames}
            onClick={() => setSelectedOption(option)}
          />
        ))}
      </div>
      <span className="font-title mb-16">
        Already have an account?{" "}
        <a className="underline font-bold cursor-pointer">Sign in</a>
      </span>
      <p className="text-sm text-gray-400 text-center">
        Click “Sign Up” to agree to {APP_NAME}'s{" "}
        <Link to="/terms-of-service" className="underline">
          Terms of Service
        </Link>{" "}
        and acknowledge that {APP_NAME}'s
        <Link to="/privacy-policy" className="underline">
          Privacy Policy
        </Link>{" "}
        applies to you.
      </p>
    </section>
  );
};

export default SplashSignUpModal;
