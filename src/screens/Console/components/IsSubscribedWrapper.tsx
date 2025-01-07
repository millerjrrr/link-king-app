import React from "react";
import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";
import Paywall from "../../popUpScreens/Paywall/Paywall";
import { ReactNode } from "react";
import { Platform } from "react-native";
import { selectConsoleState } from "@src/store/console";

const IsSubscribedWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { vip, subscribed, trialDays } =
    useSelector(authState);

  const {
    stats: { time },
    display: { tail },
  } = useSelector(selectConsoleState);

  const isWebApp = Platform.OS === "web";

  console.log(trialDays);
  const subRequired =
    new Date(vip).getTime() <= Date.now() &&
    time > 5 * 60 * 1000 &&
    trialDays === 0 &&
    tail.length === 0 &&
    !isWebApp;

  return subRequired && !subscribed ? (
    <Paywall />
  ) : (
    <>{children}</>
  );
};

export default IsSubscribedWrapper;
