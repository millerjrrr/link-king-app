import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationState,
  updateLevelPop,
} from "@src/store/notification";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AppText from "./AppText";
import useColors from "../hooks/utilityHooks/useColors";

const LevelPopAnimation = () => {
  const duration = 1000;
  const { level, popType } = useSelector(notificationState);
  const dispatch = useDispatch();
  const { GREEN, RED } = useColors();

  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const opacity = useSharedValue(1);

  const [text, setText] = useState(
    level >= 0 ? `L${level}` : "",
  );

  useEffect(() => {
    if (level >= 0) {
      setText(`L${level}`);
      x.value = 0;
      y.value = 0;
      opacity.value = 1;

      x.value = withTiming(5, { duration });
      y.value = withTiming(-80, { duration });
      opacity.value = withTiming(0, { duration });

      // Halfway point: change the text
      const midTimeout = setTimeout(() => {
        if (popType) {
          setText(`L${level + 1}`);
        } else {
          setText(`L0`);
        }
      }, duration / 2);

      // After animation: reset state
      const endTimeout = setTimeout(() => {
        dispatch(
          updateLevelPop({ level: -1, popType: false }),
        );
      }, duration);

      return () => {
        clearTimeout(midTimeout);
        clearTimeout(endTimeout);
      };
    }
  }, [level, popType, x, y, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
      ],
      opacity: opacity.value,
    };
  });

  if (level < 0) return null;

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 20,
          right: 0,
          zIndex: 10000,
        },
        animatedStyle,
      ]}
    >
      <View style={{ padding: 4 }}>
        <AppText
          style={{
            color: popType ? GREEN : RED,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {text}
        </AppText>
      </View>
    </Animated.View>
  );
};

export default LevelPopAnimation;
