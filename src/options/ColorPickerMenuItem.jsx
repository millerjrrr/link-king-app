import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ColorPicker from "./components/ColorPicker";
import OptionsMenuItemContainer from "./components/OptionsMenuItemContainer";
import appTextSource from "./../utils/appTextSource/index";
import MenuItemLink from "./components/MenuItemLink";

const ColorPickerMenuItem = () => {
  const { appLang } = useSelector(getSettingsState);
  const { colorSchemeTitle } =
    appTextSource[appLang].options;

  const [showPalette, setShowPallet] = useState(false);

  const navigation = useNavigation();

  //Hide color palette when leaving tab
  useEffect(() => {
    const hidePalette = () => setShowPallet(false);
    const unsubscribe = navigation.addListener(
      "focus",
      hidePalette,
    );
    hidePalette();
    return unsubscribe;
  }, [navigation]);

  return (
    <OptionsMenuItemContainer iconName="palette-outline">
      {!showPalette ? (
        <MenuItemLink
          {...{
            name: colorSchemeTitle,
            onPress: () => setShowPallet(true),
          }}
        />
      ) : (
        <ColorPicker />
      )}
    </OptionsMenuItemContainer>
  );
};

export default ColorPickerMenuItem;
