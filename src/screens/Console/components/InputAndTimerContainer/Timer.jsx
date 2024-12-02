import {
  Dimensions,
  Platform,
  useWindowDimensions,
  View,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import useColors from "@src/hooks/useColors";
import screenDimensions from "@src/utils/screenDimensions";

const Timer = ({ onComplete, color }) => {
  const {
    locals: {
      isPlaying,
      timerKey,
      options: { timer },
    },
  } = useSelector(selectConsoleState);
  const { PRIMARY } = useColors();

  const { width } = screenDimensions();

  return timer ? (
    <View
      style={{
        position: "absolute",
        zIndex: 1,
      }}
    >
      <CountdownCircleTimer
        key={`timer-${timerKey}`}
        isPlaying={isPlaying}
        onComplete={onComplete}
        duration={10}
        size={width * 0.95}
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
