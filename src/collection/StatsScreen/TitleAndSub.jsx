import { Text } from "react-native";
import { getConsoleState } from "../../store/console";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getStatsState } from "../../store/stats";

const TitleAndSub = () => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

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
