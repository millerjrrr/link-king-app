import { useDispatch, useSelector } from "react-redux";
import colors from "@src/utils/colors";
import {
  getSettingsState,
  updateSettings,
} from "@src/store/settings";
import {
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { saveToAsyncStorage } from "@src/utils/asyncStorage";
import appShadow from "@src/utils/appShadow";

const ColorSchemeButton = ({ cs, size = 30 }) => {
  const backgroundColor = colors[cs].SECONDARY;
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const dispatch = useDispatch();

  const statusBarColor = colors[cs].STATUSBAR;

  const onPress = () => {
    saveToAsyncStorage("color-scheme", cs);
    dispatch(updateSettings({ colorScheme: cs }));
    StatusBar.setBarStyle(statusBarColor);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {
            shadowColor: color,
            borderColor: color,
            width: size,
            backgroundColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  button: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
    ...appShadow(1),
  },
});

export default ColorSchemeButton;
