import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import colors from "../utils/colors";
import { getColorsState } from "../store/colors";

const OptionsMenuItem = ({
  iconName,
  text,
  onPress,
  first,
  color,
}) => {
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const backgroundColor = colors[colorScheme].PRIMARY;
  const borderTopColor = colors[colorScheme].SECONDARY;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <MaterialCommunityIcons
        name={iconName}
        size={32}
        color={
          color
            ? color
            : colors[colorScheme].CONTRAST[golden]
        }
        style={styles.icon}
      />
      <TouchableOpacity
        style={[
          styles.option,
          { borderTopColor },
          first
            ? { borderTopWidth: 0 }
            : { borderTopWidth: 1 },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            {
              color: color
                ? color
                : colors[colorScheme].CONTRAST[golden],
            },
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    margin: 5,
  },
  option: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    margin: 10,
  },
  text: {
    fontSize: 20,
  },
});

export default OptionsMenuItem;
