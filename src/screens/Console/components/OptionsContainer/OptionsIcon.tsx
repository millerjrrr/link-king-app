import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity } from "react-native";

import appShadow from "@src/utils/appShadow";
import useColors from "@src/hooks/utilityHooks/useColors";
import { getIconComponent } from "@src/utils/getIconComponent";
import {
  IconLibrary,
  IconNameMap,
} from "@src/types/iconLibrary";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface OptionsIconProps<T extends IconLibrary> {
  onPress: () => void;
  size?: number;
  iconLib: T;
  select: boolean;
  trueIconName: IconNameMap[T];
  falseIconName: IconNameMap[T];
  animated?: boolean;
}

const OptionsIcon = <T extends IconLibrary>({
  onPress,
  size = base * 40,
  iconLib,
  select,
  trueIconName,
  falseIconName,
  animated,
}: OptionsIconProps<T>) => {
  const height = (size * 80) / 50;
  const { SECONDARY, CONTRAST, GREEN } = useColors();

  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!animated) {
      scale.setValue(1);
      return;
    }

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();

    return () => {
      pulse.stop();
      scale.setValue(1);
    };
  }, [animated]);

  const Icon = getIconComponent(
    iconLib
  ) as React.ComponentType<{
    name: IconNameMap[T];
    size?: number;
    color?: string;
  }>;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 1000,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: base * 8,
        marginBottom: 0,
        ...appShadow(CONTRAST),
        height,
        backgroundColor: SECONDARY,
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale }],
        }}
      >
        <Icon
          name={select ? trueIconName : falseIconName}
          size={animated ? size / 1.1 : size}
          color={!animated ? CONTRAST : GREEN}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default OptionsIcon;
