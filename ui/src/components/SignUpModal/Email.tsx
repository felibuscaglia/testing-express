import { BTN_CLASSNAMES, MAIN_BRAND_COLOR } from "lib/constants";
import { FC, useState } from "react";
import { ChevronLeft } from "react-feather";
import { ISelectedComponentProps, SIGN_UP_OPTION } from "./interfaces";

const LABEL_CLASSNAMES = "text-sm text-main-brand-color capitalize";
const INPUT_CLASSNAMES =
  "text-main-brand-color py-px px-0.5 w-full text-center border-b border-gray-200 hover:border-gray-400 focus:border-main-brand-color";
const INPUT_CONTAINER_CLASSNAMES = "flex flex-col items-center mb-4 w-3/4";

interface IInput {
  email: string;
  password: string;
}

enum Input {
  EMAIL = "email",
  PASSWORD = "password",
}

const EmailSignUpOption: FC<ISelectedComponentProps> = ({
  setSelectedOption,
}) => {
  const [input, setInput] = useState<IInput>({ email: "", password: "" });
  const [focusedInput, setFocusedInput] = useState<Input>();

  const handleInputChange = (key: string, value: string) => {
    setInput({
      ...input,
      [key]: value,
    });
  };

  return (
    <section className="py-11 px-14 flex flex-col items-center">
      <h2 className="text-3xl mb-16">Sign up with your email</h2>
      {Object.entries(input).map(([key, value]) => (
        <div className={INPUT_CONTAINER_CLASSNAMES}>
          <label htmlFor={key} className={LABEL_CLASSNAMES}>
            {key}
          </label>
          <input
            id={key}
            value={value}
            type={key === Input.PASSWORD ? "password" : "email"}
            className={INPUT_CLASSNAMES}
            onChange={({ target }) =>
              handleInputChange(target.id, target.value)
            }
            onClick={() => setFocusedInput(key as Input)}
          />
        </div>
      ))}
      {/* {focusedInput === Input.PASSWORD ?} */}
      <button className={BTN_CLASSNAMES + " mt-4 w-3/5"}>Continue</button>
      <button
        className="flex items-center mt-8"
        onClick={() => setSelectedOption(SIGN_UP_OPTION.NONE)}
      >
        <ChevronLeft color={MAIN_BRAND_COLOR} size={20} strokeWidth={1} />
        <span className="text-main-brand-color text-sm">
          All sign up options
        </span>
      </button>
    </section>
  );
};

export default EmailSignUpOption;
