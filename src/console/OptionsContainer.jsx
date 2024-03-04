import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import colors from "../utils/colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getConsoleState,
  updateOptions,
} from "../store/console";
import clientWithAuth from "../api/clientWithAuth";
import { errorHandler } from "../errors/errorHandler";

const OptionsContainer = ({ size = 36 }) => {
  const { options, golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];
  const height = (size * 80) / 50;

  const { sound, blurred, timer } = options;

  const dispatch = useDispatch();

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
      <TouchableOpacity
        onPress={soundButtonFunction}
        style={[
          styles.option,
          { shadowColor: color, height },
        ]}
      >
        <MaterialIcons
          {...{
            name: sound ? "volume-up" : "volume-off",
            size,
            color,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={blurredButtonFunction}
        style={[
          styles.option,
          { shadowColor: color, height },
        ]}
      >
        <Entypo
          {...{
            name: blurred ? "eye" : "eye-with-line",
            size,
            color,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={timerButtonFunction}
        style={[
          styles.option,
          { shadowColor: color, height },
        ]}
      >
        <MaterialIcons
          {...{
            name: timer ? "timer" : "timer-off",
            size,
            color,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 10,
  },
  option: {
    borderRadius: 300,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.SECONDARY,
    marginTop: 5,
    marginRight: 4,
    marginLeft: 4,
    marginBottom: 0,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default OptionsContainer;
