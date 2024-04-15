import { View, StyleSheet, Keyboard } from "react-native";
import KeyboardIcon from "./KeyboardIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  getConsoleState,
  backOut,
} from "../../store/console";
import { submitAnswer } from "../functions/submitAnswer";

const KeyboardIconContainer = () => {
  const dispatch = useDispatch();
  const {
    showSolution,
    isPlaying,
    formValue,
    startedThisWord,
    attempt: { solutions },
  } = useSelector(getConsoleState);

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
    <View style={styles.sendToEnd}>
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
        <KeyboardIcon
          {...{
            name: "skip-forward",
            size: 48,
            onPress: dontKnowFunction,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sendToEnd: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

export default KeyboardIconContainer;
