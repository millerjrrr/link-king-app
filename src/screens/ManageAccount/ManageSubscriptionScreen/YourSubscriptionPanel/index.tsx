import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "../../../../components/AppText";
import { Linking, Platform } from "react-native";
import colors from "@src/utils/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { authState } from "@src/store/auth";
import Loader from "../../../../components/Loader";
import TermsAndConditions from "../../../../subscription/TermsAndConditions";
import useSubscribe from "../../../../hooks/subscriptionHooks/useSubscribe";
import {
  ManageSubscriptionButton,
  Panel,
  StoreCombo,
  PanelLabel,
} from "../styled";
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
