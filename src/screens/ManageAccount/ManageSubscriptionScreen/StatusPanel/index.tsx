import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import { authState } from "@src/store/auth";
import { PanelLabel } from "../styled";
import StatusPanelVIP from "./StatusPanelVIP";
import StatusPanelStandard from "./StatusPanelStandard";

const StatusPanel = () => {
  const { appLang } = useSelector(settingsState);
  const { status } =
    appTextSource(appLang).options.manageAccount
      .subscriptionPage;

  const { vip } = useSelector(authState);

  const VIP = vip <= Date.now();

  return (
    <>
      <PanelLabel>{status}</PanelLabel>
      {VIP ? <StatusPanelVIP /> : <StatusPanelStandard />}
    </>
  );
};

export default StatusPanel;
