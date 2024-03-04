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
  const soundButtonFunction = async () => {
    try {
      const newOptions = blurred
        ? { sound: !sound, blurred: false }
        : { sound: !sound };
      const { data } = await clientWithAuth.post(
        "/api/v1/gameData/updateGameSettings",
        newOptions,
      );
      dispatch(updateOptions(data.options));
    } catch (error) {
      errorHandler(error, dispatch);
    }
  };

  const blurredButtonFunction = async () => {
    try {
      const newOptions = !blurred
        ? { sound: true, blurred: !blurred }
        : { blurred: !blurred };

      const { data } = await clientWithAuth.post(
        "/api/v1/gameData/updateGameSettings",
        newOptions,
      );
      dispatch(updateOptions(data.options));
    } catch (error) {
      errorHandler(error, dispatch);
    }
  };

  const timerButtonFunction = async () => {
    try {
      const { data } = await clientWithAuth.post(
        "/api/v1/gameData/updateGameSettings",
        {
          timer: !timer,
        },
      );
      dispatch(updateOptions(data.options));
    } catch (error) {
      errorHandler(error, dispatch);
    }
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
