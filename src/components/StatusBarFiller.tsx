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
          ios: 50,
          android: (StatusBar.currentHeight || 0) + 20,
          web: 50,
        }),
        width: "100%",
        backgroundColor,
        zIndex: 1000,
      }}
    />
  );
};

export default StatusBarFiller;
