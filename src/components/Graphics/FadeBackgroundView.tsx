import useColors from "@src/hooks/utilityHooks/useColors";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";

interface FadeBackgroundViewProps {
  position?: "top" | "bottom";
  height?: number | undefined;
  style?: ViewStyle;
  children?: ReactNode;
}

const FadeBackgroundView: React.FC<
  FadeBackgroundViewProps
> = ({ position = "top", height, style, children }) => {
  const { PRIMARY } = useColors();
  const colors =
    position === "top"
      ? [
          PRIMARY,
          PRIMARY + "E6",
          PRIMARY + "80",
          PRIMARY + "00",
        ]
      : [
          PRIMARY + "00",
          PRIMARY + "80",
          PRIMARY + "E6",
          PRIMARY,
        ];

  return (
    <LinearGradient
      colors={colors as [string, string, ...string[]]}
      style={{
        position: "absolute",
        width: "100%",
        height,
        alignItems: "center",
        zIndex: 20,
        ...style,
        ...(position === "top"
          ? { top: 0 }
          : { bottom: 0 }),
      }}
    >
      {children}
    </LinearGradient>
  );
};

export default FadeBackgroundView;
