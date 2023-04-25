import { HttpStatusCode } from "axios";
import Loading from "components/Loading";
import { API_CLIENT as apiClient } from "lib/axios/apiClient";
import { API_PATHS } from "lib/enums";
import { IGuardProps } from "lib/interfaces";
import { useEffect, FC, useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO: Loader

const AuthGuard: FC<IGuardProps> = ({ component: Component }) => {
  const [loading, setLoading] = useState(true);

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

        setLoading(false);
      } catch (err) {
        navigate("/");
      }
    };

    checkAuth();
  }, []);

  if (loading) return <Loading loadingText="Authenticating" />;

  return <Component />;
};
export default AuthGuard;
