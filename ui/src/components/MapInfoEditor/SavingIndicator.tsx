import { calculateTimeDiff } from "lib/helpers";
import { FC } from "react";
import { Check, Save } from "react-feather";
import ClipLoader from "react-spinners/ClipLoader";

interface ISavingIndicatorProps {
  updatedAt: Date;
  loadingChanges: boolean | null;
}

const ICON_SIZE = 14;
const ICON_COLOR = "#9ca3af";

const SavingIndicator: FC<ISavingIndicatorProps> = ({
  updatedAt,
  loadingChanges,
}) => {
  const renderIcon = () => {
    if (loadingChanges) {
      return <ClipLoader size={ICON_SIZE} color={ICON_COLOR} />;
    } else {
      return (
        <div className="flex items-center justify-center gap-1">
          <Save size={ICON_SIZE} color={ICON_COLOR} />
          <Check size={10} color={ICON_COLOR} />
        </div>
      );
    }
  };

  return (
    <div
      className={`flex items-center justify-between w-full`}
    >
      {loadingChanges !== true && (
        <span>
          Last change was made
          {" " + calculateTimeDiff(updatedAt) + " "}
          ago
        </span>
      )}
      {loadingChanges != null && renderIcon()}
    </div>
  );
};

export default SavingIndicator;
