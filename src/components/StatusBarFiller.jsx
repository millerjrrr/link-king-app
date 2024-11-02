import { View, StatusBar, Platform } from "react-native";

const StatusBarFiller = ({ backgroundColor }) => {
  return (
    <View
      style={{
        height: Platform.select({
          ios: 50,
          android: StatusBar.currentHeight + 20,
        }),
        width: "100%",
        backgroundColor,
        zIndex: 1000,
      }}
    />
  );
};

export default StatusBarFiller;
