import { API_CLIENT as apiClient } from "lib/axios/apiClient";
import { UNEXPECTED_ERROR_MESSAGE } from "lib/constants";
import { API_PATHS } from "lib/enums";
import { showToastWithErrorMessage } from "lib/helpers";
import { IMapLayer } from "lib/interfaces";
import { FC, useState } from "react";
import { Eye, Layers, UserPlus, IconProps } from "react-feather";

const ICON_PROPS: IconProps = {
  size: 12,
};
const BTN_CLASSNAME = "text-xs flex items-center gap-1 hover:underline";

interface IActionsProps {
  setLoadingChanges: (loading: boolean) => void;
  addMapLayer: (mapLayer: IMapLayer) => void;
  mapId: string;
}

enum BTN_ACTIONS {
  ADD_LAYER,
  SHARE,
  GET_PREVIEW,
}

const Actions: FC<IActionsProps> = ({
  setLoadingChanges,
  mapId,
  addMapLayer,
}) => {
  const [loadingAction, setLoadingAction] = useState<BTN_ACTIONS | null>(null);

  const addNewLayer = () => {
    setLoadingAction(BTN_ACTIONS.ADD_LAYER);
    setLoadingChanges(true);
    apiClient
      .post<{ layer: IMapLayer }>(`${API_PATHS.CREATE_MAP_LAYER}?mapId=${mapId}`, { mapId })
      .then(({ data }) => {
        addMapLayer(data.layer);
        setLoadingChanges(false);
        setLoadingAction(null);
      })
      .catch((err) => {
        let errorMessage = UNEXPECTED_ERROR_MESSAGE;

        if (err.response) {
          const { data } = err.response;
          errorMessage = data.error;
        }

        showToastWithErrorMessage(errorMessage);
        setLoadingChanges(false);
        setLoadingAction(null);
      });
  };

  const ACTIONS = [
    {
      action: BTN_ACTIONS.ADD_LAYER,
      text: "Add a layer",
      icon: Layers,
      onClick: addNewLayer,
    },
    {
      action: BTN_ACTIONS.SHARE,
      text: "Share",
      icon: UserPlus,
      onClick: () => {},
    },
    {
      action: BTN_ACTIONS.GET_PREVIEW,
      text: "Get a preview",
      icon: Eye,
      onClick: () => {},
    },
  ];

  return (
    <div className="bg-main-brand-color px-4 py-2 text-white mt-4">
      <div className="flex items-center justify-between">
        {ACTIONS.map(({ text, icon: Icon, onClick, action }) => (
          <button
            className={`${BTN_CLASSNAME} ${
              loadingAction === action ? " cursor-wait" : " cursor-normal"
            }`}
            key={`action-button-${text}`}
            onClick={onClick}
            disabled={loadingAction === action}
          >
            <Icon {...ICON_PROPS} />
            <span>{text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Actions;
