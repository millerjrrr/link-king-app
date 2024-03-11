import { Dimensions } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import AppButton from "../../ui/AppButton";
import { getColorsState } from "../../store/colors";

const StartButton = ({ inputFieldRef }) => {
  const { timerIsOn } = useSelector(getConsoleState);
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].SECONDARY;

  const { width } = Dimensions.get("window");
  const size = width / 1.5;

  const onPress = async () => {
    if (inputFieldRef.current) {
      inputFieldRef.current.focus();
    }
  };

  // this condition (!timerIsOn) is important otherwise
  // the button disappears too slowly
  return !timerIsOn ? (
    <AppButton
      {...{
        title: "Start",
        busy: false,
        color,
        backgroundColor,
        size,
        onPress,
      }}
    />
  ) : null;
};

export default StartButton;
