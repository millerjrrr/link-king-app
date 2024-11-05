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
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import FlagImage from "../Graphics/FlagImage";

const Loader = ({ size = 24, color, backgroundColor }) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const loaderColor = color
    ? color
    : colors[colorScheme].CONTRAST[golden];

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
        backgroundColor,
      }}
    >
      <Animated.View style={transform}>
        <AntDesign
          {...{
            name: "loading1",
            size,
            color: loaderColor,
          }}
        />
      </Animated.View>
      <View
        style={{
          position: "absolute",
        }}
      >
        <FlagImage flag1={"smallCrown"} scale={size / 48} />
      </View>
    </View>
  );
};

export default Loader;
