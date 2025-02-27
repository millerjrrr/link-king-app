import { Entypo } from "@expo/vector-icons";
import { Animated, TouchableOpacity } from "react-native";
import StatusBarFiller from "../StatusBarFiller";
import React, { useEffect, useRef } from "react";
import useColors from "@src/hooks/utilityHooks/useColors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import {
  selectConsoleLocals,
  selectConsoleState,
} from "@src/store/console";

const AnimatedTouchable = Animated.createAnimatedComponent(
  TouchableOpacity,
);

interface HelpButtonProps {
  help?: () => void;
  padding?: boolean;
  nopadding?: boolean;
  tintColor?: string;
}
const HelpButton: React.FC<HelpButtonProps> = ({
  help,
  padding,
  nopadding,
  tintColor,
}) => {
  const { CONTRAST } = useColors();
  const color = tintColor || CONTRAST;

  const { helpPulsing } = useSelector(settingsState);
  const { showSolution } = useSelector(selectConsoleLocals);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const animate = () => {
    if (helpPulsing > 0 && showSolution)
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 3, // Grow to 1.5x size
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1, // Shrink back to original size
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 3 },
      ).start();
  };

  useEffect(() => {
    animate();
  }, [helpPulsing]);

  return help ? (
    <AnimatedTouchable
      onPress={help}
      style={{
        paddingVertical: nopadding ? 0 : padding ? 5 : 15,
        position: "absolute",
        top: nopadding ? 0 : 10,
        right: 0,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        transform: [{ scale: scaleAnim }],
      }}
    >
      {padding ? <StatusBarFiller /> : null}
      <Entypo {...{ name: "help", size: 24, color }} />
    </AnimatedTouchable>
  ) : null;
};

export default HelpButton;
