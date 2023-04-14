import { FC, useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { PASSWORD_VALIDATIONS } from "./validators";

interface IPasswordValidatorProps {
  password: string;
}

const PasswordValidator: FC<IPasswordValidatorProps> = ({ password }) => {
  return (
    <section>
      {PASSWORD_VALIDATIONS.map(({ label, validator, key }) => (
        <div className="flex items-center gap-2" key={'password-validator-' + key}>
          {validator(password) ? <CheckCircle /> : <XCircle />}
          <p className="text-sm">{label}</p>
        </div>
      ))}
    </section>
  );
};

export default PasswordValidator;
