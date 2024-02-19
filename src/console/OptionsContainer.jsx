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

const optionsSize = 36;

const OptionsContainer = () => {
  const { options, golden } = useSelector(getConsoleState);

  const { sound, blurred, timer } = options;

  const dispatch = useDispatch();

  const soundButtonFunction = async () => {
    console.log("PressedSound");
    try {
      console.log(!sound);

      const newOptions = blurred
        ? { sound: !sound, blurred: false }
        : { sound: !sound };

      console.log(newOptions);

      const { data } = await clientWithAuth.post(
        "/api/v1/gameData/updateGameSettings",
        newOptions,
      );
      dispatch(updateOptions(data.options));
    } catch (error) {
      console.log("Console error:", error);
    }
  };

  const blurredButtonFunction = async () => {
    console.log("PressedBlurred");
    try {
      console.log(!blurred);
      const newOptions = !blurred
        ? { sound: true, blurred: !blurred }
        : { blurred: !blurred };

      const { data } = await clientWithAuth.post(
        "/api/v1/gameData/updateGameSettings",
        newOptions,
      );
      dispatch(updateOptions(data.options));
    } catch (error) {
      console.log("Console error:", error);
    }
  };

  const timerButtonFunction = async () => {
    console.log("PressedTimer");
    try {
      console.log(!timer);
      const { data } = await clientWithAuth.post(
        "/api/v1/gameData/updateGameSettings",
        {
          timer: !timer,
        },
      );
      dispatch(updateOptions(data.options));
    } catch (error) {
      console.log("Console error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={soundButtonFunction}
        style={[
          styles.option,
          { shadowColor: colors.CONTRAST[golden] },
        ]}
      >
        {sound ? (
          <MaterialIcons
            name="volume-up"
            size={optionsSize}
            color={colors.CONTRAST[golden]}
          />
        ) : (
          <MaterialIcons
            name="volume-off"
            size={optionsSize}
            color={colors.CONTRAST[golden]}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={blurredButtonFunction}
        style={[
          styles.option,
          { shadowColor: colors.CONTRAST[golden] },
        ]}
      >
        {!blurred ? (
          <Entypo
            name="eye"
            size={optionsSize}
            color={colors.CONTRAST[golden]}
          />
        ) : (
          <Entypo
            name="eye-with-line"
            size={optionsSize}
            color={colors.CONTRAST[golden]}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={timerButtonFunction}
        style={[
          styles.option,
          { shadowColor: colors.CONTRAST[golden] },
        ]}
      >
        {timer ? (
          <MaterialIcons
            name="timer"
            size={optionsSize}
            color={colors.CONTRAST[golden]}
          />
        ) : (
          <MaterialIcons
            name="timer-off"
            size={optionsSize}
            color={colors.CONTRAST[golden]}
          />
        )}
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
    borderRadius: (optionsSize * 80) / 48 / 2,
    width: (optionsSize * 80) / 48,
    height: (optionsSize * 80) / 48,
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
