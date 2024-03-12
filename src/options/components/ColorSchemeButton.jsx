import { useDispatch, useSelector } from "react-redux";
import AppButton from "../../ui/AppButton";
import colors from "../../utils/colors";
import {
  getColorsState,
  updateColors,
} from "../../store/colors";
import { StatusBar } from "react-native";

const ColorSchemeButton = ({ cs }) => {
  const backgroundColor = colors[cs].SECONDARY;
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const dispatch = useDispatch();

  const statusBarColor = colors[cs].STATUSBAR;

  const onPress = () => {
    dispatch(updateColors({ colorScheme: cs }));
    StatusBar.setBarStyle(statusBarColor);
  };

  return (
    <AppButton
      {...{ backgroundColor, color, size: 24, onPress }}
    />
  );
};

export default ColorSchemeButton;
