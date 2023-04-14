import { FC } from "react";
import { AlertTriangle } from "react-feather";

interface IErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<IErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-300 border border-2 border-red-600 p-4 rounded-md flex items-center justify-center gap-2 w-3/4 self-center">
      <AlertTriangle />
      <p className="font-title">{message}</p>
    </div>
  );
};

export default ErrorMessage;
