import { View, Text } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import colors from "../utils/colors";

const Timer = ({ isPlaying, key, onComplete, color }) => {
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
        size={400}
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
