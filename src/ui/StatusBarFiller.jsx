import { View, StatusBar } from "react-native";

const StatusBarFiller = ({ backgroundColor }) => {
  return (
    <View
      style={{
        height: StatusBar.currentHeight || 30,
        width: "100%",
        backgroundColor,
        zIndex: 1000,
      }}
    />
  );
};

export default StatusBarFiller;
