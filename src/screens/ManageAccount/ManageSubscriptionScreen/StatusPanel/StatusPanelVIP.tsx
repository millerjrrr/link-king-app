import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "../../../../components/AppText";
import colors from "@src/utils/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { authState } from "@src/store/auth";
import { Panel } from "../styled";

const StatusPanelVIP = () => {
  const { colorScheme, appLang, golden } =
    useSelector(settingsState);
  const { subscribed: subscribedMessage, notSubscribed } =
    appTextSource(appLang).options.manageAccount
      .subscriptionPage;

  const { SECONDARY, CONTRAST } = colors[colorScheme];

  const { subscribed } = useSelector(authState);

  return (
    <Panel
      backgroundColor={SECONDARY}
      shadowColor={CONTRAST[golden]}
    >
      <AppText>
        {subscribed ? subscribedMessage : notSubscribed}
      </AppText>
      <FontAwesome5
        name={subscribed ? "check" : "times"}
        size={24}
        color={CONTRAST[(golden + 1) % 2]}
      />
    </Panel>
  );
};

export default StatusPanelVIP;
