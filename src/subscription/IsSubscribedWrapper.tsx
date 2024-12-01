import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";
import Paywall from "./Paywall";
import { ReactNode } from "react";
import { Platform } from "react-native";

const IsSubscribedWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { trialDays, vip, subscribed } =
    useSelector(authState);

  const isWebApp = Platform.OS === "web";

  const subRequired =
    vip <= Date.now() && trialDays <= 0 && !isWebApp;

  return subRequired && !subscribed ? (
    <Paywall />
  ) : (
    <>{children}</>
  );
};

export default IsSubscribedWrapper;
