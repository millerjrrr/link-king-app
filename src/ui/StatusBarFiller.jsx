import { View, StatusBar, Platform } from "react-native";

const StatusBarFiller = (props) => {
  const statusBarHeight =
    Platform.OS === "ios"
      ? StatusBar.currentHeight || 30
      : StatusBar.height;

  return <View style={{ height: statusBarHeight }} />;
};

export default StatusBarFiller;
