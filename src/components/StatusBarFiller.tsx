import screenDimensions from "@src/utils/screenDimensions";
import React from "react";
import { View, StatusBar, Platform } from "react-native";

interface StatusBarFillerProps {
  backgroundColor?: string;
}

const StatusBarFiller: React.FC<StatusBarFillerProps> = ({
  backgroundColor,
}) => {
  return (
    <View
      style={{
        height: Platform.select({
          ios: screenDimensions().height * 0.0542,
          android: (StatusBar.currentHeight || 0) + 20,
          web: screenDimensions().height * 0.0542,
        }),
        width: "100%",
        backgroundColor,
        zIndex: 1000,
      }}
    />
  );
};

export default StatusBarFiller;
