import { createContext } from "react";

interface IAuthContext {
  signText: string;
  isSignIn: boolean;
}

export const AUTH_CONTEXT = createContext<IAuthContext>({
  signText: "",
  isSignIn: false,
});
