import { Dimensions } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import AppButton from "../../ui/AppButton";
import { getSettingsState } from "../../store/settings";
import appTextContent from "../../utils/appTextContent";

const StartButton = ({ inputFieldRef }) => {
  const { timerIsOn } = useSelector(getConsoleState);
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].SECONDARY;

  const title = appTextContent.english.console.start;

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
        title,
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
