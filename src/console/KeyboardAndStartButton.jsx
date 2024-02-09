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
import * as Speech from "expo-speech";
import {
  getConsoleState,
  updateFormValue,
  updateTimerIsOn,
  updateKey,
  updateIsPlaying,
} from "../store/console";
import { returnWrongAnswerToServer } from "./functions/returnWrongAnswerToServer";

const { width } = Dimensions.get("window");

const KeyboardAndStartButton = ({ inputFieldRef }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] =
    useState(false);

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
  const { isPlaying, timeOnThisWord, timerIsOn, attempt } =
    useSelector(getConsoleState);

  const startFunction = async () => {
    Speech.speak(attempt.target, {
      language: attempt.speechLang,
    });
    if (inputFieldRef.current) {
      inputFieldRef.current.focus();
    }
    dispatch(updateIsPlaying(true));
    dispatch(updateTimerIsOn(true));
    dispatch(updateFormValue(""));
    dispatch(updateKey()); // used to highlight the input
  };

  const dontKnowFunction = () =>
    returnWrongAnswerToServer(
      dispatch,
      timeOnThisWord,
      timerIsOn,
    );

  return isKeyboardVisible ? (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Pressable
          onPress={() => Keyboard.dismiss()}
          style={styles.keyboardIcon}
        >
          <Entypo
            name="back"
            size={48}
            color={colors.CONTRAST}
          />
        </Pressable>
        <Pressable
          onPress={() => Keyboard.dismiss()}
          style={styles.keyboardIcon}
        >
          <MaterialCommunityIcons
            name="keyboard-off"
            size={24}
            color={colors.CONTRAST}
          />
        </Pressable>
        <Pressable
          onPress={dontKnowFunction}
          style={styles.dontKnowIcon}
        >
          <MaterialCommunityIcons
            name="skip-forward"
            size={48}
            color={colors.CONTRAST}
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
