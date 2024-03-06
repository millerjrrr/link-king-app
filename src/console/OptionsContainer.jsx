import { View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getConsoleState,
  updateOptions,
} from "../store/console";
import clientWithAuth from "../api/clientWithAuth";
import { errorHandler } from "../errors/errorHandler";
import OptionsIcon from "./OptionsIcon";

const OptionsContainer = ({ size = 40 }) => {
  const {
    options: { sound, blurred, timer },
    golden,
  } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

  const dispatch = useDispatch();

  // These functions are slightly different
  // and should be kept separate

  const sendOptions = async ({ options }) => {
    try {
      const { data } = await clientWithAuth.post(
        "/api/console/update-game-settings",
        options,
      );
      dispatch(updateOptions(data.options));
    } catch (error) {
      errorHandler(error, dispatch);
    }
  };

  const soundButtonFunction = async () => {
    const options = blurred
      ? { sound: !sound, blurred: false }
      : { sound: !sound };
    await sendOptions({ options });
  };

  const blurredButtonFunction = async () => {
    const options = !blurred
      ? { sound: true, blurred: !blurred }
      : { blurred: !blurred };
    await sendOptions({ options });
  };

  const timerButtonFunction = async () => {
    const options = {
      timer: !timer,
    };
    await sendOptions({ options });
  };

  return (
    <View style={styles.container}>
      <OptionsIcon
        {...{
          onPress: soundButtonFunction,
          color,
          size,
          option: sound,
          textTrue: "volume-up",
          textFalse: "volume-off",
        }}
      />
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
