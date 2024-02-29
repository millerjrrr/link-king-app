import {
  View,
  Pressable,
  StyleSheet,
  Keyboard,
  Dimensions,
} from "react-native";
import colors from "../utils/colors";
import {
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import StartButton from "./StartButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getConsoleState,
  updateTimerIsOn,
  updateIsPlaying,
  resetTimer,
} from "../store/console";
import { returnWrongAnswerToServer } from "./functions/returnWrongAnswerToServer";

const KeyboardAndStartButton = ({ inputFieldRef }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] =
    useState(false);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const dispatch = useDispatch();
  const {
    isPlaying,
    startedThisWord,
    showSolution,
    golden,
  } = useSelector(getConsoleState);

  const startFunction = async () => {
    if (inputFieldRef.current) {
      inputFieldRef.current.focus();
    }
  };

  const closeKeyboardSubmitAnswer = () => {
    if (!showSolution && isPlaying)
      returnWrongAnswerToServer(dispatch, timeOnThisWord);
    else {
      dispatch(updateIsPlaying(false));
      dispatch(resetTimer());
      dispatch(updateTimerIsOn(false));
    }
    Keyboard.dismiss();
  };

  const dontKnowFunction = () =>
    returnWrongAnswerToServer(dispatch, startedThisWord);

  return isKeyboardVisible ? (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Pressable
          onPress={closeKeyboardSubmitAnswer}
          style={styles.keyboardIcon}
        >
          <Entypo
            name="back"
            size={48}
            color={colors.CONTRAST[golden]}
          />
        </Pressable>
        <Pressable
          onPress={closeKeyboardSubmitAnswer}
          style={styles.keyboardIcon}
        >
          <MaterialCommunityIcons
            name="keyboard-off"
            size={24}
            color={colors.CONTRAST[golden]}
          />
        </Pressable>
        <Pressable
          onPress={dontKnowFunction}
          style={styles.dontKnowIcon}
        >
          <MaterialCommunityIcons
            name="skip-forward"
            size={48}
            color={colors.CONTRAST[golden]}
          />
        </Pressable>
      </View>
    </View>
  ) : !isPlaying ? (
    <StartButton
      title="Start"
      size={width / 1.5}
      onPress={startFunction}
    />
  ) : null;
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  dontKnowIcon: {
    overflow: "hidden",
    margin: 4,
  },
  keyboardIcon: {
    overflow: "hidden",
    margin: 4,
  },
});

export default KeyboardAndStartButton;
