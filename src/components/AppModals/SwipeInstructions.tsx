import React, {
  useRef,
  useEffect,
  forwardRef,
} from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useColors from "@src/hooks/utilityHooks/useColors";

interface InstructionProps {
  iconProps: any;
  label: string;
  style?: StyleProp<ViewStyle>;
}

// Forward ref and accept style for animation
const Instruction = forwardRef<View, InstructionProps>(
  ({ iconProps, label, style }, ref) => {
    const { CONTRAST } = useColors();

    return (
      <View
        ref={ref}
        style={[{ alignItems: "center" }, style]}
      >
        <Ionicons {...iconProps} />
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: CONTRAST,
            }}
          >
            {label}
          </Text>
        </View>
      </View>
    );
  },
);

const AnimatedInstruction =
  Animated.createAnimatedComponent(Instruction);

const SwipeInstructions = () => {
  const { GREEN, RED } = useColors();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]),
    ).start();
  }, [scaleAnim]);

  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        opacity: 0.5,
        width: "100%",
      }}
    >
      <AnimatedInstruction
        iconProps={{
          name: "arrow-undo",
          size: 140,
          color: RED,
        }}
        label="Left Swipe"
        style={{
          transform: [
            { scale: scaleAnim },
            { rotate: "-5deg" },
          ],
        }}
      />

      <AnimatedInstruction
        iconProps={{
          name: "arrow-undo",
          size: 140,
          color: GREEN,
          style: { transform: [{ scaleX: -1 }] },
        }}
        label="Right Swipe"
        style={{
          transform: [
            { scale: scaleAnim },
            { rotate: "5deg" },
          ],
        }}
      />
    </View>
  );
};

export default SwipeInstructions;
