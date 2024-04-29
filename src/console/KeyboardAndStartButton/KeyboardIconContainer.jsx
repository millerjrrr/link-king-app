import { View, StyleSheet, Keyboard } from "react-native";
import KeyboardIcon from "./KeyboardIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  getConsoleState,
  backOut,
} from "../../store/console";
import { submitAnswer } from "../functions/submitAnswer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../utils/colors";

const KeyboardIconContainer = () => {
  const dispatch = useDispatch();
  const {
    showSolution,
    isPlaying,
    formValue,
    startedThisWord,
    attempt: { solutions },
    tries,
  } = useSelector(getConsoleState);

  const color = colors.dark.INACTIVE_CONTRAST;

  const closeKeyboard = () => {
    if (!showSolution && isPlaying) {
      submitAnswer({
        dispatch,
        formValue,
        solutions,
        tries: 1,
        startedThisWord,
        showSolution: false,
      });
    } else {
      dispatch(backOut());
    }
    Keyboard.dismiss();
  };

  const dontKnowFunction = () => {
    submitAnswer({
      dispatch,
      formValue,
      solutions,
      tries: 1,
      startedThisWord,
      showSolution: false,
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardIcon
        {...{
          name: "back",
          entypo: true,
          size: 48,
          onPress: closeKeyboard,
        }}
      />
      <KeyboardIcon
        {...{
          name: "keyboard-off",
          size: 24,
          onPress: closeKeyboard,
        }}
      />
      {tries > 1 ? (
        <KeyboardIcon
          {...{
            name: "skip-forward",
            size: 48,
            onPress: dontKnowFunction,
          }}
        />
      ) : (
        <MaterialCommunityIcons
          {...{ name: "skip-forward", size: 48, color }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    bottom: 0,
    center: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

export default KeyboardIconContainer;
