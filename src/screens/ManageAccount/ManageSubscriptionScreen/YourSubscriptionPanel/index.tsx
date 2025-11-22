import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import { authState } from "@src/store/auth";
// import useSubscribe from "../../../../hooks/subscriptionHooks/useSubscribe";
import { PanelLabel } from "../styled";
import Subscribed from "./Subscribed";
import NotSubscribedPanel from "./NotSubscribed";

const YourSubscriptionPanel = () => {
  const { appLang } = useSelector(settingsState);
  const { yourSubscription } =
    appTextSource(appLang).options.manageAccount
      .subscriptionPage;

  const { subscribed } = useSelector(authState);

  return (
    <>
      <PanelLabel>{yourSubscription}</PanelLabel>
      {subscribed ? <Subscribed /> : <NotSubscribedPanel />}
    </>
  );
};

export default YourSubscriptionPanel;
