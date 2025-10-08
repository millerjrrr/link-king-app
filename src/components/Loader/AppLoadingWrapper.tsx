import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";

const AppLoadingWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { appLoading } = useSelector(authState);

  return <>{children}</>;
};

export default AppLoadingWrapper;
