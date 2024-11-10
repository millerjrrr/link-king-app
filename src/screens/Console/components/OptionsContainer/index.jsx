import { View, StyleSheet } from "react-native";
import colors from "@src/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  selectConsoleState,
  updateOptions,
} from "@src/store/console";
import OptionsIcon from "./OptionsIcon";
import { settingsState } from "@src/store/settings";
import useCheckTTSData from "@src/hooks/consoleHooks/useCheckTTSData";
import { updateModals } from "@src/store/modals";

const OptionsContainer = ({ size = 40, show = 0 }) => {
  const {
    locals: {
      options: { sound, blurred, timer },
    },
  } = useSelector(selectConsoleState);
  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  const checkTTSData = useCheckTTSData();
  const dispatch = useDispatch();

  const soundButtonFunction = async () => {
    const TTS = sound || (await checkTTSData());
    if (!TTS)
      dispatch(updateModals({ showMissingTTSModal: true }));
    else {
      const options = blurred
        ? { sound: !sound, blurred: false }
        : { sound: !sound };
      dispatch(updateOptions(options));
    }
  };

  const blurredButtonFunction = async () => {
    const TTS = blurred || (await checkTTSData());
    if (!TTS)
      dispatch(updateModals({ showMissingTTSModal: true }));
    else {
      const options = !blurred
        ? { sound: true, blurred: !blurred }
        : { blurred: !blurred };
      dispatch(updateOptions(options));
    }
  };

  const timerButtonFunction = async () => {
    const options = {
      timer: !timer,
    };
    dispatch(updateOptions(options));
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
