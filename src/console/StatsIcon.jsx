import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const StatsIcon = ({
  iconName = "clock-outline",
  text = "",
  size = 18,
}) => {
  const { golden } = useSelector(getConsoleState);
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={iconName}
        size={size}
        color={colors.CONTRAST[golden]}
      />
      <Text
        style={{
          color: colors.CONTRAST[golden],
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 8,
    marginLeft: 8,
    marginTop: 2,
    marginBottom: 2,
  },
});

export default StatsIcon;
