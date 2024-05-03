import { Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import { useNavigation } from "@react-navigation/native";

const ShareButton = () => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        onPress={() => console.log("pressed")}
        style={styles.container}
      >
        <Entypo
          {...{
            name: "share",
            size: 30,
            color,
          }}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
});

export default ShareButton;
