import { Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import { useNavigation } from "@react-navigation/native";

const BackButton = ({ extraPadding }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[
          styles.container,
          {
            paddingVertical: extraPadding ? 45 : 15,
            paddingRight: 15,
          },
        ]}
      >
        <Entypo
          {...{
            name: "chevron-small-left",
            size: 48,
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
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});

export default BackButton;