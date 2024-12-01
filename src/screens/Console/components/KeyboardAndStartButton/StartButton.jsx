import {
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { selectConsoleLocals } from "@src/store/console";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import appShadow from "@src/utils/appShadow";
import AppText from "@src/components/AppText";

const StartButton = ({ inputFieldRef }) => {
  const { timerIsOn } = useSelector(selectConsoleLocals);
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].SECONDARY;

  const title = appTextSource(appLang).console.start;

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
            width: size,
            backgroundColor,
            ...appShadow(color),
          },
        ]}
      >
        <AppText
          {...{
            style: {
              fontSize: size / 7,
            },
          }}
        >
          {title}
        </AppText>
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default StartButton;
