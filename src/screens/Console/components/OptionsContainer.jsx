import { View, StyleSheet } from "react-native";
import colors from "@assets/themes/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getConsoleState,
  updateOptions,
} from "@src/store/console";
import clientWithAuth from "@src/api/clientWithAuth";
import { errorHandler } from "@src/errors/errorHandler";
import OptionsIcon from "./OptionsIcon";
import { getSettingsState } from "@src/store/settings";

const OptionsContainer = ({ size = 40, show = 0 }) => {
  const {
    options: { sound, blurred, timer },
  } = useSelector(getConsoleState);
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const dispatch = useDispatch();

  // These functions are slightly different
  // and should be kept separate

  const sendOptions = async ({ options }) => {
    try {
      const { data } = await clientWithAuth.post(
        "/api/v1/console/update-game-settings",
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
