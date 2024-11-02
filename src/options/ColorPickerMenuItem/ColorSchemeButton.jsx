import { useDispatch, useSelector } from "react-redux";
import AppButton from "@src/components/Buttons/AppButton";
import colors from "@src/utils/colors";
import {
  getSettingsState,
  updateSettings,
} from "@src/store/settings";
import { StatusBar } from "react-native";
import { saveToAsyncStorage } from "@src/utils/asyncStorage";

const ColorSchemeButton = ({ cs }) => {
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
    <AppButton
      {...{
        backgroundColor,
        color,
        size: 30,
        onPress,
        margin: 0,
      }}
    />
  );
};

export default ColorSchemeButton;
