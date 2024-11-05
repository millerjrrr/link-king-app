import { View, Dimensions } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useSelector } from "react-redux";
import { consoleState } from "@src/store/console";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";

const Timer = ({ onComplete, color }) => {
  const { isPlaying, key, options } =
    useSelector(consoleState);
  const { colorScheme } = useSelector(settingsState);
  const { PRIMARY } = colors[colorScheme];
  const { timer } = options;

  const screenWidth = Dimensions.get("window").width;
  return timer ? (
    <View
      style={{
        position: "absolute",
        zIndex: 0,
      }}
    >
      <CountdownCircleTimer
        key={`timer-${key}`}
        isPlaying={isPlaying}
        onComplete={onComplete}
        duration={10}
        size={0.95 * screenWidth}
        colors={[PRIMARY, color]}
        strokeWidth={2}
        trailStrokeWidth={0}
        colorsTime={[10, 0]}
        updateInterval={0.1}
      ></CountdownCircleTimer>
    </View>
  ) : null;
};

export default Timer;
