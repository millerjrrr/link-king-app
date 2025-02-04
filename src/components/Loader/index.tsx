import React, { useEffect } from "react";
import { Image, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import useColors from "@src/hooks/useColors";

declare function require(path: string): any;

interface LoaderProps {
  size?: number;
  color?: string;
  altimage?: boolean;
  duration?: number;
}
const Loader: React.FC<LoaderProps> = ({
  size = 24,
  color,
  altimage,
  duration = 700,
}) => {
  const { CONTRAST, SECONDARY } = useColors();
  const loaderColor = color || CONTRAST;

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
        duration,
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
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: altimage ? SECONDARY : undefined,
      }}
    >
      <Animated.View style={transform}>
        {!altimage ? (
          <AntDesign
            {...{
              name: "loading1",
              size,
              color: loaderColor,
            }}
          />
        ) : (
          <AntDesign
            {...{
              name: "loading2",
              size,
              color: loaderColor,
            }}
          />
        )}
      </Animated.View>
      <View
        style={{
          position: "absolute",
          borderRadius: 500,
          backgroundColor: !altimage
            ? SECONDARY
            : undefined,
        }}
      >
        <Image
          source={require("@assets/adaptive-icon.png")}
          tintColor={loaderColor}
          resizeMode="contain"
          style={{
            height: size * 0.9,
            width: size * 0.9, //aspect ratio =1 no good on web
          }}
        />
      </View>
    </View>
  );
};

export default Loader;
