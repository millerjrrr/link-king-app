import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { statsState } from "@src/store/stats";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";

const CongratsAndName = () => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);
  const nameColor =
    colors[colorScheme].CONTRAST[(golden + 1) % 2];

  const {
    userGameData: { collectedWords },
    username,
  } = useSelector(statsState);

  const { congratulations, collected } =
    appTextSource(appLang).collection.progressScreen;
  return (
    <>
      <AppText
        style={{
          fontWeight: "bold",
          fontSize: 40,
        }}
      >
        {congratulations}
      </AppText>
      <AppText
        style={{
          fontWeight: "bold",
          fontSize: 30,
          color: nameColor,
        }}
      >
        {username.split(" ")[0]}
      </AppText>
      <AppText
        style={{
          fontSize: 20,
        }}
      >
        {collected.A + collectedWords + collected.B}
      </AppText>
    </>
  );
};

export default CongratsAndName;
