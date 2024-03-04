import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const StatsIcon = ({
  name = "clock-outline",
  text = "",
  size = 18,
}) => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons {...{ name, size, color }} />
      <Text
        style={{
          color,
          fontSize: size,
          paddingLeft: 3,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
});

export default StatsIcon;
