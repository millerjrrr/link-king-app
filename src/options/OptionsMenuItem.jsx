import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import colors from "../utils/colors";

const OptionsMenuItem = ({
  iconName,
  text,
  onPress,
  first,
}) => {
  const { golden } = useSelector(getConsoleState);
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={iconName}
        size={32}
        color={colors.CONTRAST[golden]}
        style={styles.icon}
      />
      <TouchableOpacity
        style={[
          styles.option,
          first
            ? { borderTopWidth: 0 }
            : { borderTopWidth: 1 },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            { color: colors.CONTRAST[golden] },
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
    backgroundColor: colors.PRIMARY,
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    margin: 5,
  },
  option: {
    flex: 1,
    height: "100%",
    borderTopColor: colors.SECONDARY,
    justifyContent: "center",
    margin: 10,
  },
  text: {
    fontSize: 20,
  },
});

export default OptionsMenuItem;
