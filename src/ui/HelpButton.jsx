import { Entypo } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const HelpButton = ({ help }) => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

  return help ? (
    <View style={styles.makeRelative}>
      <TouchableOpacity
        onPress={help}
        style={styles.container}
      >
        <Entypo {...{ name: "help", size: 24, color }} />
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  makeRelative: {
    height: 0,
    width: "100%",
  },
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingVertical: 15,
    paddingLeft: 50,
  },
});

export default HelpButton;
