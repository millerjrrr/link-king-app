import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";
import useColors from "@src/hooks/useColors";
import Loader from ".";
declare function require(path: string): any;

const AppLoadingWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { appLoading } = useSelector(authState);
  const { CONTRAST } = useColors();

  return (
    <>
      {appLoading ? (
        <Loader
          size={200}
          color={CONTRAST}
          altimage
          duration={1500}
        />
      ) : (
        children
      )}
    </>
  );
};

export default AppLoadingWrapper;
