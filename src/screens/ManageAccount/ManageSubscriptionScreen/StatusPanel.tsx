import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "../../../components/AppText";
import colors from "@src/utils/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { authState } from "@src/store/auth";
import { Panel, PanelLabel } from "./styled";

const StatusPanel = () => {
  const { colorScheme, appLang, golden } =
    useSelector(settingsState);
  const {
    status,
    subscribed,
    notSubscribed,
    vipMessage,
    vipExpires,
  } =
    appTextSource(appLang).options.manageAccount
      .subscriptionPage;

  const { SECONDARY, CONTRAST } = colors[colorScheme];

  const { subscribed: test, vip } = useSelector(authState);

  const userIsSubscribed = !test;

  const date = new Date(vip);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const expires = new Intl.DateTimeFormat(
    appLang,
    options,
  ).format(date);

  return (
    <>
      <PanelLabel>{status}</PanelLabel>
      <Panel backgroundColor={SECONDARY}>
        {vip <= Date.now() ? (
          <>
            <AppText>
              {userIsSubscribed
                ? subscribed
                : notSubscribed}
            </AppText>
            <FontAwesome5
              name={userIsSubscribed ? "check" : "times"}
              size={24}
              color={CONTRAST[(golden + 1) % 2]}
            />
          </>
        ) : (
          <>
            <AppText>{vipMessage}</AppText>
            <AppText style={{ fontSize: 15 }}>
              {vipExpires + expires}
            </AppText>
          </>
        )}
      </Panel>
    </>
  );
};

export default StatusPanel;
