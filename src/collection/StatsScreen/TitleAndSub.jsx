import { Text } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getStatsState } from "../../store/stats";
import { getSettingsState } from "../../store/settings";
import appTextContent from "../../utils/appTextContent";

const TitleAndSub = () => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const {
    userGameData: { collectedWords },
  } = useSelector(getStatsState);

  const { congratulations, textA, textB } =
    appTextContent.english.collection.statsScreen;
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
          fontSize: 20,
          margin: 5,
          textAlign: "center",
          color,
        }}
      >
        {textA + " " + collectedWords + " " + textB}
      </Text>
    </>
  );
};

export default TitleAndSub;
