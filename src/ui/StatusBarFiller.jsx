import { View, StatusBar, Platform } from "react-native";

const StatusBarFiller = (props) => {
  return (
    <View
      style={{ height: StatusBar.currentHeight || 30 }}
    />
  );
};

export default StatusBarFiller;
