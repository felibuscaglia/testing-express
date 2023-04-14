import { API_CLIENT as apiClient } from "lib/axios/apiClient";
import {
  BTN_CLASSNAMES,
  MAIN_BRAND_COLOR,
  UNEXPECTED_ERROR_MESSAGE,
} from "lib/constants";
import { validateEmail } from "lib/helpers";
import { FC, useEffect, useMemo, useState } from "react";
import { ChevronLeft } from "react-feather";
import { ISelectedComponentProps, SIGN_UP_OPTION } from "../interfaces";
import PasswordValidator from "./PasswordValidator";
import { PASSWORD_VALIDATIONS } from "./validators";
import ClipLoader from "react-spinners/ClipLoader";

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
  setError,
}) => {
  const [input, setInput] = useState<IInput>({ email: "", password: "" });
  const [focusedInput, setFocusedInput] = useState<Input>();
  const [loading, setLoading] = useState(false);
  const [validations, setValidations] = useState<{ [key: string]: boolean }>({
    [Input.EMAIL]: false,
    [Input.PASSWORD]: false,
  });

  const handleInputChange = (key: string, value: string) => {
    setInput({
      ...input,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    setError(null); // Setting error as null in case there was an error setted.

    apiClient
      .post("/users", input)
      .then(({ data }) => console.log({ data }))
      .catch((error) => {
        let errorMessage = UNEXPECTED_ERROR_MESSAGE;
        let errorsList: string[] | undefined;

        if (error.response) {
          const { data } = error.response;
          errorMessage = data.message;
          errorsList = data.errors;
        }

        setError({
          message: errorMessage,
          errors: errorsList,
        });
        setLoading(false);
      });
  };

  const isEmailValid = useMemo(() => validateEmail(input.email), [input.email]);

  const isPasswordValid = useMemo(() => {
    const passwordValidations = PASSWORD_VALIDATIONS.map(({ validator }) =>
      validator(input.password)
    );
    return passwordValidations.every((isValid) => isValid);
  }, [input.password]);

  useEffect(() => {
    setValidations({
      ...validations,
      [Input.EMAIL]: isEmailValid,
    });
  }, [isEmailValid]);

  useEffect(() => {
    setValidations({
      ...validations,
      [Input.PASSWORD]: isPasswordValid,
    });
  }, [isPasswordValid]);

  const isInputValid = isEmailValid && isPasswordValid;

  return (
    <section className="py-11 px-14 flex flex-col items-center">
      <h2 className="text-3xl mb-16">Sign up with your email</h2>
      {Object.entries(input).map(([key, value]) => (
        <div className={INPUT_CONTAINER_CLASSNAMES} key={`input-${key}`}>
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
      {focusedInput === Input.PASSWORD && (
        <PasswordValidator password={input.password} />
      )}
      <button
        className={
          BTN_CLASSNAMES +
          " mt-4 w-3/5 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-white disabled:border-gray-300 flex items-center justify-center"
        }
        disabled={!isInputValid || loading}
        onClick={handleSubmit}
      >
        {!loading && "Continue"}
        <ClipLoader
          color={"white"}
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </button>
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
