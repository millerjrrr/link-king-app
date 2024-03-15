import { useDispatch, useSelector } from "react-redux";
import AppButton from "../../ui/AppButton";
import colors from "../../utils/colors";
import {
  getSettingsState,
  updateSettings,
} from "../../store/settings";
import { StatusBar } from "react-native";
import { saveToAsyncStorage } from "../../utils/asyncStorage";

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
      {...{ backgroundColor, color, size: 24, onPress }}
    />
  );
};

export default ColorSchemeButton;
