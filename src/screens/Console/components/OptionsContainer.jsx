import { View, StyleSheet } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import OptionsIcon from "./OptionsIcon";
import { settingsState } from "@src/store/settings";
import useSendOptions from "@src/hooks/consoleHooks/useSendOptions";
import useCheckTTSData from "@src/hooks/consoleHooks/useCheckTTSData";

const OptionsContainer = ({ size = 40, show = 0 }) => {
  const {
    options: { sound, blurred, timer },
  } = useSelector(selectConsoleState);
  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  const sendOptions = useSendOptions();
  const checkCheckTTSData = useCheckTTSData();

  const soundButtonFunction = async () => {
    const TTS = sound || (await checkCheckTTSData());
    if (!TTS)
      console.log(
        "No speech data. Some Android phone's don't have TTS data pre-installed (to save memory). That's ok. You can download Text to Speech data for free. You can even choose different accents. Check out this video where we go through it in detail!",
      );
    else {
      const options = blurred
        ? { sound: !sound, blurred: false }
        : { sound: !sound };
      await sendOptions(options);
    }
  };

  const blurredButtonFunction = async () => {
    const TTS = blurred || (await checkCheckTTSData());
    if (!TTS)
      console.log(
        "No speech data. Some Android phone's don't have TTS data pre-installed (to save memory). That's ok. You can download Text to Speech data for free. You can even choose different accents. Check out this video where we go through it in detail!",
      );
    else {
      const options = !blurred
        ? { sound: true, blurred: !blurred }
        : { blurred: !blurred };
      await sendOptions(options);
    }
  };

  const timerButtonFunction = async () => {
    const options = {
      timer: !timer,
    };
    await sendOptions(options);
  };

  return (
    <View style={styles.container}>
      {show === 0 || show === 1 ? (
        <OptionsIcon
          {...{
            onPress: soundButtonFunction,
            color,
            size,
            option: sound,
            textTrue: "hearing",
            textFalse: "hearing-disabled",
          }}
        />
      ) : null}
      {show === 0 || show === 2 ? (
        <OptionsIcon
          {...{
            onPress: blurredButtonFunction,
            color,
            size,
            entypo: true,
            option: !blurred,
            textTrue: "eye",
            textFalse: "eye-with-line",
          }}
        />
      ) : null}
      {show === 0 || show === 3 ? (
        <OptionsIcon
          {...{
            onPress: timerButtonFunction,
            color,
            size,
            option: timer,
            textTrue: "timer",
            textFalse: "timer-off",
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 3,
    zIndex: 10,
  },
});

export default OptionsContainer;
