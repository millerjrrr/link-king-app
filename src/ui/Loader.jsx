import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import colors from "../utils/colors";

const Loader = ({ color = colors.CONTRAST, size = 24 }) => {
  const initialRotation = useSharedValue(0);

  const transform = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${initialRotation.value}deg` },
      ],
    };
  });

  useEffect(() => {
    const animation = withRepeat(
      withTiming(360, {
        duration: 700,
        easing: Easing.linear,
      }),
      -1,
    );

    initialRotation.value = animation;

    return () => {
      initialRotation.value = 0; // Reset the value when the component unmounts
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View style={transform}>
        <AntDesign
          name="loading1"
          size={size}
          color={color}
        />
      </Animated.View>
    </View>
  );
};

export default Loader;
