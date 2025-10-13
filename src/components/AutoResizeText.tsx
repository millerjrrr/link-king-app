import useColors from "@src/hooks/utilityHooks/useColors";
import React, { ReactNode, useState } from "react";
import { Text, TextProps } from "react-native";

interface AutoResizeTextProps extends TextProps {
  fontSize?: number;
  minFontSize?: number;
  numberOfLines?: number;
  children: ReactNode;
}

/**
 * Automatically scales text size down until it fits on one line.
 */
const AutoResizeText: React.FC<AutoResizeTextProps> = ({
  fontSize = 24,
  minFontSize = 14,
  numberOfLines = 1,
  children,
  ...rest
}) => {
  const [adjustedFont, setAdjustedFont] =
    useState(fontSize);

  const handleLayout = (e: any) => {
    const { lines } = e.nativeEvent;
    if (
      lines?.length > numberOfLines &&
      adjustedFont > minFontSize
    ) {
      setAdjustedFont((prev) =>
        Math.max(minFontSize, prev - 1)
      );
    }
  };

  const { CONTRAST: color } = useColors();

  return (
    <Text
      {...rest}
      numberOfLines={numberOfLines}
      onTextLayout={handleLayout}
      style={{
        fontSize: adjustedFont,
        fontWeight: "bold",
        color,
      }}
    >
      {children}
    </Text>
  );
};

export default AutoResizeText;
