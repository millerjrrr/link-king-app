import appTextSource from "../../utils/appTextSource";
import AppText from "../../ui/AppText";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import { getConsoleState } from "../../store/console";

const ChallengeFriends = () => {
  const { appLang } = useSelector(getSettingsState);
  const { dictionary } = useSelector(getConsoleState);
  const { challenge } =
    appTextSource[appLang].collection.progressScreen;

  return (
    <>
      <AppText {...{ size: 20 }}>
        {challenge.A + dictionary + challenge.B}
      </AppText>
      <AppText {...{ size: 20, weight: "bold" }}>
        {challenge.C}
      </AppText>
      <AppText {...{ size: 20 }}>{challenge.D}</AppText>
    </>
  );
};

export default ChallengeFriends;
