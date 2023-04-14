import { IAPIError } from "lib/interfaces";
import { FC } from "react";
import { AlertTriangle } from "react-feather";

const ErrorMessage: FC<IAPIError> = ({ message, errors }) => {
  return (
    <div className="bg-red-300 border-2 border-red-600 p-4 rounded-md flex items-center justify-center flex-col gap-2 w-3/4 self-center text-center">
      <AlertTriangle />
      <p className="font-title font-bold text-lg">{message}</p>
      {errors && (
        <ul>
          {errors.map((err) => (
            <li>
              <p className="font-title">- {err.charAt(0).toUpperCase() + err.slice(1)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ErrorMessage;
