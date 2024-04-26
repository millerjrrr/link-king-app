import {
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import appShadow from "../../utils/appShadow";

const StartButton = ({ inputFieldRef }) => {
  const { timerIsOn } = useSelector(getConsoleState);
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].SECONDARY;

  const title = appTextSource[appLang].console.start;

  const { width } = Dimensions.get("window");
  const size = width / 1.75;

  const onPress = async () => {
    if (inputFieldRef.current) {
      inputFieldRef.current.focus();
    }
  };

  // this condition (!timerIsOn) is important otherwise
  // the button disappears too slowly
  return !timerIsOn ? (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {
            shadowColor: color,
            borderColor: color,
            width: size,
            backgroundColor,
          },
        ]}
      >
        <Text
          {...{
            style: {
              color,
              fontSize: size / 7,
              textAlign: "center",
            },
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  button: {
    margin: 30,
    marginBottom: 120,
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    ...appShadow(1),
  },
});

export default StartButton;
