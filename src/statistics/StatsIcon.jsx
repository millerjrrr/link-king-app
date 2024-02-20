import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const StatsIcon = ({
  name = "",
  iconName = "clock-outline",
  value = "",
  units = "",
  size = 90,
}) => {
  const { golden } = useSelector(getConsoleState);
  return (
    <View style={styles.cell}>
      <Text
        style={{
          color: colors.CONTRAST[golden],
          fontSize: size / 6,
        }}
      >
        {name}
      </Text>
      <MaterialCommunityIcons
        name={iconName}
        size={size}
        color={colors.CONTRAST[golden]}
      />
      <Text
        style={{
          color: colors.CONTRAST[golden],
          fontSize: size / 4,
        }}
      >
        {value + units}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    fontSize: 20,
  },
});

export default StatsIcon;
