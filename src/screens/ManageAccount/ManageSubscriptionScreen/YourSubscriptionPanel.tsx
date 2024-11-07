import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "../../../components/AppText";
import { Linking, Platform } from "react-native";
import colors from "@src/utils/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { authState } from "@src/store/auth";
import Loader from "../../../components/Loader";
import TermsAndConditions from "../../../subscription/TermsAndConditions";
import useSubscribe from "../../../hooks/subscriptionHooks/useSubscribe";
import {
  ManageSubscriptionButton,
  Panel,
  StoreCombo,
  PanelLabel,
} from "./styled";

const YourSubscriptionPanel = () => {
  const { colorScheme, appLang, golden } =
    useSelector(settingsState);
  const {
    yourSubscription,
    manage,
    appStore,
    playStore,
    subscribe: subscribeText,
  } = appTextSource(appLang).options.manageAccount
    .subscriptionPage;

  const { PRIMARY, SECONDARY, CONTRAST } =
    colors[colorScheme];

  const { subscribed: userIsSubscribed, busy } =
    useSelector(authState);

  const subscribe = useSubscribe();

  const onPress = !userIsSubscribed
    ? () => {
        const url =
          Platform.OS === "ios"
            ? "https://apps.apple.com/account/subscriptions"
            : "https://play.google.com/store/account/subscriptions";
        Linking.openURL(url);
      }
    : subscribe;

  return (
    <>
      <PanelLabel>{yourSubscription}</PanelLabel>
      <Panel
        backgroundColor={SECONDARY}
        flexDirection={userIsSubscribed ? "row" : "column"}
      >
        <>
          {userIsSubscribed ? (
            <StoreCombo>
              <FontAwesome5
                name={
                  Platform.OS === "ios"
                    ? "app-store-ios"
                    : "google-play"
                }
                size={48}
                color={CONTRAST[golden]}
              />
              <AppText>
                {Platform.OS === "ios"
                  ? appStore
                  : playStore}
              </AppText>
            </StoreCombo>
          ) : null}
          {!userIsSubscribed ? (
            <TermsAndConditions />
          ) : null}
          <ManageSubscriptionButton
            buttonColor={PRIMARY}
            onPress={onPress}
            userIsSubscribed={userIsSubscribed}
          >
            {busy ? (
              <Loader size={24} />
            ) : (
              <PanelLabel>
                {userIsSubscribed ? manage : subscribeText}
              </PanelLabel>
            )}
          </ManageSubscriptionButton>
        </>
      </Panel>
    </>
  );
};

export default YourSubscriptionPanel;
