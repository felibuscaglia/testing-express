import { Eye, Layers, UserPlus, IconProps } from "react-feather";

const ICON_PROPS: IconProps = {
  size: 12,
};
const BTN_CLASSNAME = "text-xs flex items-center gap-1 hover:underline";

const Actions = () => {
  const ACTIONS = [
    {
      text: "Add a layer",
      icon: Layers,
    },
    {
      text: "Share",
      icon: UserPlus,
    },
    {
      text: "Get a preview",
      icon: Eye,
    },
  ];

  return (
    <div className="bg-main-brand-color px-4 py-2 text-white mt-4">
      <div className="flex items-center justify-between">
        {ACTIONS.map(({ text, icon: Icon }) => (
          <button className={BTN_CLASSNAME} key={`action-button-${text}`}>
            <Icon {...ICON_PROPS} />
            <span>{text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Actions;
