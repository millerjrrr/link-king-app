import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";
import Paywall from "./Paywall";
import useCheckSubscriptionStatus from "../hooks/subscriptionHooks/useCheckSubscriptionStatus";
import { ReactNode } from "react";

const IsSubscribedWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { trialDays, vip, subscribed } =
    useSelector(authState);

  const subRequired = vip <= Date.now() && trialDays <= 0;

  return subRequired && !subscribed ? (
    <Paywall />
  ) : (
    <>{children}</>
  );
};

export default IsSubscribedWrapper;
