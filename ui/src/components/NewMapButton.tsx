import {
  BTN_CLASSNAMES,
  MAIN_BRAND_COLOR,
  TEXT_FONT_FAMILY,
  UNEXPECTED_ERROR_MESSAGE,
} from "lib/constants";
import { API_CLIENT as apiClient } from "lib/axios/apiClient";
import { Plus } from "react-feather";
import { ICreateMapResponse } from "lib/interfaces";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from "react-hot-toast";
import { API_PATHS } from "lib/enums";

const NewMapButton = () => {
  const [loading, setLoading] = useState(false);

  const createNewMap = () => {
    setLoading(true);
    apiClient
      .post<ICreateMapResponse>(API_PATHS.NEW_MAP)
      .then(({ data }) => (window.location.href = `/maps/${data.mapId}`))
      .catch((err) => {
        let errorMessage = UNEXPECTED_ERROR_MESSAGE;

        if (err.response) {
          const { data } = err.response;
          errorMessage = data.message;
        }
        toast.error(errorMessage, {
          position: "bottom-center",
          style: {
            background: MAIN_BRAND_COLOR,
            padding: "16px",
            color: "white",
            fontFamily: TEXT_FONT_FAMILY,
          },
          iconTheme: {
            primary: "red",
            secondary: "white",
          },
        });
        setLoading(false);
      });
  };

  return (
    <>
      <button
        className={BTN_CLASSNAMES + " disabled:bg-main-brand-color"}
        onClick={createNewMap}
        disabled={loading}
      >
        {!loading && (
          <div className="flex items-center justify-center">
            <Plus size={20} />
            <span>NEW MAP</span>
          </div>
        )}
        <ClipLoader
          color="white"
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
        />
      </button>
      <Toaster />
    </>
  );
};

export default NewMapButton;

// TODO: Add min-width
