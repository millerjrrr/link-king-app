import { Dimensions } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import AppButton from "../../ui/AppButton";

const StartButton = ({ inputFieldRef }) => {
  const { timerIsOn, golden } =
    useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

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
        size,
        onPress,
      }}
    />
  ) : null;
};

export default StartButton;
