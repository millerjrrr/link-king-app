import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";
import AppLoaderVideo from "../AppLoaderVideo";

const AppLoadingWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { appLoading } = useSelector(authState);

  return <>{appLoading ? <AppLoaderVideo /> : children}</>;
};

export default AppLoadingWrapper;
