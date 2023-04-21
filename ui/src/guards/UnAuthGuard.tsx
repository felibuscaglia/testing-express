import { IGuardProps } from "lib/interfaces";
import { FC, Fragment, useEffect } from "react";

// TODO: Implement

const UnAuthGuard: FC<IGuardProps> = ({ component: Component }) => {
  useEffect(() => {
    console.log("UnAuth Guard");
  }, [Component]);

  return (
    <Fragment>
      <Component />
    </Fragment>
  );
};

export default UnAuthGuard;
