import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";
import BusyWrapper from "./BusyWrapper";

const AppLoadingWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { appLoading } = useSelector(authState);

  return (
    <BusyWrapper busy={appLoading} size={200}>
      {children}
    </BusyWrapper>
  );
};

export default AppLoadingWrapper;
