import { Text } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getStatsState } from "../../store/stats";
import { getSettingsState } from "../../store/settings";

const TitleAndSub = () => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const {
    userGameData: { collectedWords },
  } = useSelector(getStatsState);

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
        Congratulations!
      </Text>
      <Text
        style={{
          fontSize: 20,
          margin: 5,
          textAlign: "center",
          color,
        }}
      >
        You've collected {collectedWords} new words!
      </Text>
    </>
  );
};

export default TitleAndSub;
