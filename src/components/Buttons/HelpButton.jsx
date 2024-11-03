import { Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "@assets/themes/colors";
import { useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import StatusBarFiller from "../StatusBarFiller";

const HelpButton = ({ help, padding }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  return help ? (
    <>
      <TouchableOpacity
        onPress={help}
        style={[
          styles.container,
          { paddingVertical: padding ? 5 : 15 },
        ]}
      >
        {padding ? <StatusBarFiller /> : null}
        <Entypo {...{ name: "help", size: 24, color }} />
      </TouchableOpacity>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    right: 0,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});

export default HelpButton;
