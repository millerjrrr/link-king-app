import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";
import Paywall from "./Paywall";
import useCheckSubscriptionStatus from "../hooks/subscriptionHooks/useCheckSubscriptionStatus";

const IsSubscribedWrapper = ({ children }) => {
  const { trialDays, vip, subscribed } =
    useSelector(authState);

  const subRequired = vip <= Date.now() && trialDays <= 0;

  useCheckSubscriptionStatus();

  return !subRequired || subscribed ? (
    <>{children}</>
  ) : (
    <Paywall />
  );
};

export default IsSubscribedWrapper;
