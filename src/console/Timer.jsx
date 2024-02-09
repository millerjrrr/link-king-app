import { View, Dimensions } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const Timer = ({ onComplete, color }) => {
  const { isPlaying, key } = useSelector(getConsoleState);

  const screenWidth = Dimensions.get("window").width;
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 0,
      }}
    >
      <CountdownCircleTimer
        key={key}
        isPlaying={isPlaying}
        onComplete={onComplete}
        duration={10}
        size={0.95 * screenWidth}
        colors={[colors.PRIMARY, color]}
        strokeWidth={2}
        trailStrokeWidth={0}
        colorsTime={[10, 0]}
        updateInterval={0.1}
      ></CountdownCircleTimer>
    </View>
  );
};

export default Timer;
