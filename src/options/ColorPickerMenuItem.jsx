import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../utils/colors";
import { getSettingsState } from "../store/settings";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ColorPicker from "./components/ColorPicker";
import OptionsMenuItemContainer from "./components/OptionsMenuItemContainer";
import appTextSource from "./../utils/appTextSource/index";

const ColorPickerMenuItem = () => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const [showPalette, setShowPallet] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const hidePalette = () => setShowPallet(false);
    const unsubscribe = navigation.addListener(
      "focus",
      hidePalette,
    );
    hidePalette();
    return unsubscribe;
  }, [navigation]);

  const { colorSchemeTitle } =
    appTextSource[appLang].options;

  return (
    <OptionsMenuItemContainer iconName="palette-outline">
      {!showPalette ? (
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center" }}
          onPress={() => setShowPallet(true)}
        >
          <Text {...{ style: { fontSize: 20, color } }}>
            {colorSchemeTitle}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ColorPicker />
        </View>
      )}
    </OptionsMenuItemContainer>
  );
};

export default ColorPickerMenuItem;
