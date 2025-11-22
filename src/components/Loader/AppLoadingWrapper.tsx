import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";
import BusyWrapper from "./BusyWrapper";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const AppLoadingWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { appLoading } = useSelector(authState);

  return (
    <BusyWrapper busy={appLoading} size={base * 200}>
      {children}
    </BusyWrapper>
  );
};

export default AppLoadingWrapper;
