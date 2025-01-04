import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { authState } from "@src/store/auth";
import TermsAndConditions from "@src/screens/popUpScreens/Paywall/TermsAndConditions";
import useSubscribe from "@src/hooks/subscriptionHooks/useSubscribe";
import {
  ManageSubscriptionButton,
  Panel,
  PanelLabel,
} from "../styled";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import { View } from "react-native";

const NotSubscribedPanel = () => {
  const { colorScheme, appLang, golden } =
    useSelector(settingsState);
  const { manage, subscribe: subscribeText } =
    appTextSource(appLang).options.manageAccount
      .subscriptionPage;

  const { PRIMARY, SECONDARY, CONTRAST } =
    colors[colorScheme];

  const { subscribed: userIsSubscribed, busy } =
    useSelector(authState);

  const subscribe = useSubscribe();

  return (
    <Panel
      shadowColor={CONTRAST[golden]}
      backgroundColor={SECONDARY}
      flexDirection={userIsSubscribed ? "row" : "column"}
    >
      <TermsAndConditions />
      <ManageSubscriptionButton
        buttonColor={PRIMARY}
        shadowColor={CONTRAST[golden]}
        onPress={subscribe}
      >
        <View style={{ width: 150, alignItems: "center" }}>
          <BusyWrapper busy={busy} size={30} noFlex>
            <PanelLabel>{subscribeText}</PanelLabel>
          </BusyWrapper>
        </View>
      </ManageSubscriptionButton>
    </Panel>
  );
};

export default NotSubscribedPanel;
