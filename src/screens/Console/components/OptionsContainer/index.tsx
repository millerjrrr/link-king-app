import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectConsoleLocals,
  updateOptions,
} from "@src/store/console";
import OptionsIcon from "./OptionsIcon";
import useCheckTTSData from "@src/hooks/consoleHooks/useCheckTTSData";
import { updateModals } from "@src/store/modals";
import listenerService from "@src/utils/listenerService";

interface OptionsContainerProps {
  size?: number;
  show?: "all" | "sound" | "blurred" | "time" | "listening";
}
const OptionsContainer: React.FC<OptionsContainerProps> = ({
  size = 35,
  show = "all",
}) => {
  const {
    options: { sound, blurred, timer, listening },
  } = useSelector(selectConsoleLocals);

  const checkTTSData = useCheckTTSData();
  const dispatch = useDispatch();

  const soundButtonFunction = async () => {
    const TTS = sound || (await checkTTSData());
    if (!TTS)
      dispatch(
        updateModals({ modalShowing: "missingTTSModal" }),
      );
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
      dispatch(
        updateModals({ modalShowing: "missingTTSModal" }),
      );
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

  const listeningButtonFunction = async () => {
    if (!listening) {
      listenerService.startListening();
    } else {
      listenerService.stopListening();
    }
  };

  return (
    <View style={styles.container}>
      {show === "all" || show === "sound" ? (
        <OptionsIcon
          onPress={soundButtonFunction}
          iconLib="MaterialIcons"
          size={size}
          select={sound}
          trueIconName="hearing"
          falseIconName="hearing-disabled"
        />
      ) : null}
      {show === "all" || show === "blurred" ? (
        <OptionsIcon
          onPress={blurredButtonFunction}
          iconLib="Entypo"
          size={size}
          select={!blurred}
          trueIconName="eye"
          falseIconName="eye-with-line"
        />
      ) : null}
      {show === "all" || show === "time" ? (
        <OptionsIcon
          onPress={timerButtonFunction}
          iconLib="MaterialIcons"
          size={size}
          select={timer}
          trueIconName="timer"
          falseIconName="timer-off"
        />
      ) : null}
      {show === "all" || show === "listening" ? (
        <OptionsIcon
          onPress={listeningButtonFunction}
          iconLib="FontAwesome"
          size={size}
          select={listening}
          trueIconName="microphone"
          falseIconName="microphone-slash"
          animated={listening}
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
