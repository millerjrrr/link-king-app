import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "../../../../components/AppText";
import { Linking, Platform } from "react-native";
import colors from "@src/utils/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { authState } from "@src/store/auth";
import {
  ManageSubscriptionButton,
  Panel,
  StoreCombo,
  PanelLabel,
} from "../styled";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const Subscribed = () => {
  const { colorScheme, appLang, golden } =
    useSelector(settingsState);
  const { manage, appStore, playStore } =
    appTextSource(appLang).options.manageAccount
      .subscriptionPage;

  const { PRIMARY, SECONDARY, CONTRAST } =
    colors[colorScheme];

  const onPress = () => {
    const url =
      Platform.OS === "ios"
        ? "https://apps.apple.com/account/subscriptions"
        : "https://play.google.com/store/account/subscriptions";
    Linking.openURL(url);
  };

  return (
    <Panel
      backgroundColor={SECONDARY}
      shadowColor={CONTRAST[golden]}
      flexDirection={"row"}
    >
      <>
        <StoreCombo>
          <FontAwesome5
            name={
              Platform.OS === "ios"
                ? "app-store-ios"
                : "google-play"
            }
            size={base * 32}
            color={CONTRAST[golden]}
          />
          <AppText style={{ paddingLeft: base * 10 }}>
            {Platform.OS === "ios" ? appStore : playStore}
          </AppText>
        </StoreCombo>
        <ManageSubscriptionButton
          shadowColor={CONTRAST[golden]}
          buttonColor={PRIMARY}
          onPress={onPress}
        >
          <PanelLabel>{manage}</PanelLabel>
        </ManageSubscriptionButton>
      </>
    </Panel>
  );
};

export default Subscribed;
