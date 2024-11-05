import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ColorPicker from "./ColorPicker";
import OptionsMenuItemContainer from "../OptionsMenuItemContainer";
import appTextSource from "@src/utils/appTextSource";
import MenuItemLink from "../MenuItemLink";

const ColorPickerMenuItem = () => {
  const { appLang } = useSelector(settingsState);
  const { colorSchemeTitle } =
    appTextSource(appLang).options;

  const [showPalette, setShowPallet] = useState(false);

  const navigation = useNavigation();

  //Hide color palette when leaving tab
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () =>
      setShowPallet(false),
    );
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
