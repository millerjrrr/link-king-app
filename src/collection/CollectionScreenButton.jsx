import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { getSettingsState } from "../store/settings";
import appShadow from "../utils/appShadow";

const CollectionScreenButton = ({ onPress, iconName }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const { SECONDARY, CONTRAST } = colors[colorScheme];
  const color = CONTRAST[golden];

  return (
    <TouchableOpacity
      {...{
        style: [
          styles.button,
          {
            shadowColor: color,
            borderColor: color,
            backgroundColor: SECONDARY,
          },
        ],
        onPress,
      }}
    >
      <AntDesign {...{ name: iconName, size: 18, color }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 30,
    aspectRatio: 1,
    margin: 7,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
    ...appShadow(1),
  },
  text: {
    fontSize: 15,
    textAlign: "center",
  },
});

export default CollectionScreenButton;
