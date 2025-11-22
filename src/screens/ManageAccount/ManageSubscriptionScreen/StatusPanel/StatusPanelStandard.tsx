import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "../../../../components/AppText";
import colors from "@src/utils/colors";
import { authState } from "@src/store/auth";
import { Panel } from "../styled";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const StatusPanelStandard = () => {
  const { colorScheme, appLang, golden } =
    useSelector(settingsState);
  const { vipMessage, vipExpires } =
    appTextSource(appLang).options.manageAccount
      .subscriptionPage;

  const { SECONDARY, CONTRAST } = colors[colorScheme];

  const { vip } = useSelector(authState);

  const date = new Date(vip);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const expires = new Intl.DateTimeFormat(
    appLang,
    options
  ).format(date);

  return (
    <Panel
      backgroundColor={SECONDARY}
      shadowColor={CONTRAST[golden]}
    >
      <AppText>{vipMessage}</AppText>
      <AppText style={{ fontSize: base * 15 }}>
        {vipExpires + expires}
      </AppText>
    </Panel>
  );
};

export default StatusPanelStandard;
