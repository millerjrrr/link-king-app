import { Text } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import { getStatsState } from "../../store/stats";

const RatingCircle = () => {
  const { golden } = useSelector(getConsoleState);
  const { userGameData } = useSelector(getStatsState);
  return (
    <>
      <Text
        style={{
          fontSize: 20,
          margin: 20,
          color: colors.GREENPROGRESS,
        }}
      >
        Your performance rating is
      </Text>
      <CircularProgress
        value={userGameData.rating}
        radius={100}
        maxValue={2500}
        progressValueColor={colors.CONTRAST[golden]}
        activeStrokeColor={colors.GREENPROGRESS}
        activeStrokeSecondaryColor={colors.CONTRAST[golden]}
        inActiveStrokeColor={colors.GREENPROGRESS}
        inActiveStrokeOpacity={0.2}
      />
    </>
  );
};

export default RatingCircle;
