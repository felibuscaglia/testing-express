import { FC, FunctionComponent, SVGProps } from "react";

interface ISocialLoginButtonProps {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  iconClassnames?: string;
  onClick: () => void;
  label: string;
}

const SocialLoginButton: FC<ISocialLoginButtonProps> = ({
  icon: Icon,
  iconClassnames = "",
  onClick,
  label,
}) => {
  return (
    <button
      className="border border-main-brand-color py-1.5 px-3 rounded-full w-full text-main-brand-color hover:bg-main-brand-color hover:text-white flex items-center gap-2"
      onClick={onClick}
    >
      <Icon className={"h-5 w-5 " + iconClassnames} />
      <span className="text-sm">{label}</span>
    </button>
  );
};

export default SocialLoginButton;
