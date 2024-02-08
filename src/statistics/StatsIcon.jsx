import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";

const StatsIcon = ({
  name = "",
  iconName = "clock-outline",
  value = "",
  units = "",
  size = 90,
}) => {
  return (
    <View style={styles.cell}>
      <Text
        style={{
          color: colors.CONTRAST,
          fontSize: size / 6,
        }}
      >
        {name}
      </Text>
      <MaterialCommunityIcons
        name={iconName}
        size={size}
        color={colors.CONTRAST}
      />
      <Text
        style={{
          color: colors.CONTRAST,
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
    color: colors.CONTRAST,
    padding: 5,
    fontSize: 20,
  },
});

export default StatsIcon;
