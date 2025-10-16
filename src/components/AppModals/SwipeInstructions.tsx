import React, {
  useRef,
  useEffect,
  forwardRef,
  ComponentProps,
} from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useColors from "@src/hooks/utilityHooks/useColors";
import appTextSource from "../../utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "../../store/settings";
import useAppNotification from "../../hooks/utilityHooks/useAppNotification";

interface IconProps {
  name: ComponentProps<typeof Ionicons>["name"];
  size: number;
  color: `#${string}`;
  flip?: boolean;
}
interface InstructionProps {
  iconProps: IconProps;
  label: string;
  style?: StyleProp<ViewStyle>;
}

// Forward ref and accept style for animation
const Instruction = forwardRef<View, InstructionProps>(
  ({ iconProps, label, style }, ref) => {
    const { CONTRAST } = useColors();
    const { appLang } = useSelector(settingsState);

    const message =
      appTextSource(appLang).console.swipeGesturePrompts
        .notification;
    const appNofification = useAppNotification();

    const onPress = () => appNofification("info", message);

    const { name, size, color, flip } = iconProps;

    return (
      <View
        ref={ref}
        style={[{ alignItems: "center" }, style]}
      >
        <View
          style={
            flip
              ? { transform: [{ scaleX: -1 }] }
              : undefined
          }
        >
          <Ionicons {...{ name, size, color }} />
        </View>
        <Pressable
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
          onPress={onPress}
        >
          <Text
            style={{
              fontSize: 15,
              color: CONTRAST,
            }}
          >
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }
);

const AnimatedInstruction =
  Animated.createAnimatedComponent(Instruction);

const SwipeInstructions = () => {
  const { GREEN, RED } = useColors();
  const { appLang } = useSelector(settingsState);
  const { left, right } =
    appTextSource(appLang).console.swipeGesturePrompts;

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
      ])
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
        label={left}
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
          flip: true,
        }}
        label={right}
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
