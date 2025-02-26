import { useDispatch, useSelector } from "react-redux";
import colors from "@src/utils/colors";
import {
  settingsState,
  updateSettings,
} from "@src/store/settings";
import {
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { saveToAsyncStorage } from "@src/utils/asyncStorage";
import appShadow from "@src/utils/appShadow";
import useColors from "@src/hooks/utilityHooks/useColors";

const ColorSchemeButton = ({ cs, size = 30 }) => {
  const { CONTRAST: shadowColor } = useColors();
  const dispatch = useDispatch();

  const {
    STATUSBAR: statusBarColor,
    SECONDARY: backgroundColor,
    CONTRAST,
  } = colors[cs];

  const onPress = () => {
    saveToAsyncStorage("color-scheme", cs);
    dispatch(updateSettings({ colorScheme: cs }));
    StatusBar.setBarStyle(statusBarColor);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...appShadow(shadowColor),
          width: size,
          backgroundColor,
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
        }}
      >
        <Image
          source={require("@assets/adaptive-icon.png")}
          tintColor={CONTRAST[0]}
          resizeMode="contain"
          style={{
            height: size * 0.7,
            width: size * 0.7, //important for web dev
            aspectRatio: 1,
          }}
        />
      </TouchableOpacity>
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
});

export default ColorSchemeButton;
