import { Text } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getStatsState } from "../../store/stats";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";

const CongratsAndName = () => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const nameColor =
    colors[colorScheme].CONTRAST[(golden + 1) % 2];

  const {
    userGameData: { collectedWords },
    username,
  } = useSelector(getStatsState);

  const { congratulations, textA, textB } =
    appTextSource[appLang].collection.progressScreen;
  return (
    <>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 40,
          textAlign: "center",
          color,
        }}
      >
        {congratulations}
      </Text>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 30,
          textAlign: "center",
          color: nameColor,
        }}
      >
        {username.split(" ")[0]}
      </Text>
    </>
  );
};

export default CongratsAndName;
