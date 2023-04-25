import { HttpStatusCode } from "axios";
import { API_CLIENT as apiClient } from "lib/axios/apiClient";
import { API_PATHS } from "lib/enums";
import { IGuardProps } from "lib/interfaces";
import { useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";

// TODO: Loader

const AuthGuard: FC<IGuardProps> = ({ component: Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiClient.get<{ isAuthenticated: boolean }>(
          API_PATHS.CHECK_AUTH
        );

        if (res.status !== HttpStatusCode.Ok) {
          throw new Error("Unauthorized");
        }
      } catch (err) {
        navigate("/");
      }
    };

    checkAuth();
  }, []);

  return <Component />;
};
export default AuthGuard;
