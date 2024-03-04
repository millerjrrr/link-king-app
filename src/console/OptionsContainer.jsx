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

const Option = ({
  onPress,
  color,
  size,
  entypo,
  option,
  textTrue,
  textFalse,
}) => {
  const height = (size * 80) / 50;

  return (
    <TouchableOpacity
      {...{
        onPress,
        style: [
          styles.option,
          { shadowColor: color, height },
        ],
      }}
    >
      {entypo ? (
        <Entypo
          {...{
            name: option ? textTrue : textFalse,
            size,
            color,
          }}
        />
      ) : (
        <MaterialIcons
          {...{
            name: option ? textTrue : textFalse,
            size,
            color,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const OptionsContainer = ({ size = 36 }) => {
  const { options, golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

  const { sound, blurred, timer } = options;

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
      <Option
        {...{
          onPress: soundButtonFunction,
          color,
          size,
          option: sound,
          textTrue: "volume-up",
          textFalse: "volume-off",
        }}
      />
      <Option
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
      <Option
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
    justifyContent: "center",
    zIndex: 10,
  },
  option: {
    borderRadius: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.SECONDARY,
    margin: 5,
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
