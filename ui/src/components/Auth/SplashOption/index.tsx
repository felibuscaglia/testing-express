import { APP_NAME, SMALL_TEXT_CLASSNAMES } from "lib/constants";
import { Link } from "react-router-dom";
import SocialLoginButton from "./SocialLoginButton";
import { ReactComponent as GoogleIcon } from "assets/icons/logo-google.svg";
import { Facebook, Mail } from "react-feather";
import { FC, useContext } from "react";
import { ISelectedComponentProps, SIGN_UP_OPTION } from "../interfaces";
import { AUTH_CONTEXT as AuthContext } from "contexts/AuthContext";

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

  const { signText, isSignIn } = useContext(AuthContext);

  return (
    <section className="py-11 px-14 flex flex-col items-center">
      <h2 className="text-3xl">
        {isSignIn ? "Welcome back." : "Join AtlasCraft."}
      </h2>
      <div className="flex flex-col items-center gap-3 mt-16 mb-8">
        {BUTTONS.map(({ option, icon, iconClassnames }) => (
          <SocialLoginButton
            label={`${signText} with ${option}`}
            icon={icon}
            iconClassnames={iconClassnames}
            onClick={() => setSelectedOption(option)}
            key={`social-login-btn-${option}`}
          />
        ))}
      </div>
      <span className={`font-title mb-${isSignIn ? 8 : 16}`}>
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <a className="underline font-bold cursor-pointer">
          {isSignIn ? "Sign up" : "Sign in"}
        </a>
      </span>
      <p className={SMALL_TEXT_CLASSNAMES}>
        Click “{signText}” to agree to {APP_NAME}'s{" "}
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
