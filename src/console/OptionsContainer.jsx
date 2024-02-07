import { View, Pressable, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateOptions } from "../store/console";
import clientWithAuth from "../api/clientWithAuth";

const optionsSize = 36;

const OptionsContainer = ({ options }) => {
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
      <Pressable
        onPress={soundButtonFunction}
        style={styles.option}
      >
        {sound ? (
          <MaterialIcons
            name="volume-up"
            size={optionsSize}
            color={colors.CONTRAST}
          />
        ) : (
          <MaterialIcons
            name="volume-off"
            size={optionsSize}
            color={colors.CONTRAST}
          />
        )}
      </Pressable>
      <Pressable
        onPress={blurredButtonFunction}
        style={styles.option}
      >
        {!blurred ? (
          <Entypo
            name="eye"
            size={optionsSize}
            color={colors.CONTRAST}
          />
        ) : (
          <Entypo
            name="eye-with-line"
            size={optionsSize}
            color={colors.CONTRAST}
          />
        )}
      </Pressable>
      <Pressable
        onPress={timerButtonFunction}
        style={styles.option}
      >
        {timer ? (
          <MaterialIcons
            name="timer"
            size={optionsSize}
            color={colors.CONTRAST}
          />
        ) : (
          <MaterialIcons
            name="timer-off"
            size={optionsSize}
            color={colors.CONTRAST}
          />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 10,
  },
  option: {
    borderRadius: 15,
    overflow: "hidden",
    width: (optionsSize * 80) / 48,
    height: (optionsSize * 80) / 48,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.CONTRAST,
    backgroundColor: colors.PRIMARY,
    marginTop: 5,
    marginRight: 2,
    marginLeft: 2,
    marginBottom: 0,
  },
});

export default OptionsContainer;
