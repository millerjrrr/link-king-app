import { useDispatch } from "react-redux";
import colors from "@src/utils/colors";
import { updateSettings } from "@src/store/settings";
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
import icon from "@assets/adaptive-icon.png";

const ColorSchemeButton: React.FC<{
  cs: keyof typeof colors;
  size?: number;
}> = ({ cs, size = 30 }) => {
  const { CONTRAST: shadowColor } = useColors();
  const dispatch = useDispatch();

  const { SECONDARY: backgroundColor, CONTRAST } =
    colors[cs];

  const onPress = () => {
    saveToAsyncStorage("color-scheme", cs);
    dispatch(updateSettings({ colorScheme: cs }));
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
          borderRadius: size,
        }}
      >
        <Image
          source={icon}
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
