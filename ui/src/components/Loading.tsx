import { MAIN_BRAND_COLOR } from "lib/constants";
import { FC } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface ILoadingProps {
  loadingText: string;
  withDots?: boolean;
}

const Loading: FC<ILoadingProps> = ({ loadingText, withDots = true }) => {
  return (
    <div className="w-screen h-screen flex flex-col gap-8 items-center justify-center">
      <ClipLoader
        color={MAIN_BRAND_COLOR}
        loading
        size={90}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h2 className="text-3xl">
        {loadingText}
        {withDots ? "..." : ""}
      </h2>
    </div>
  );
};

export default Loading;
