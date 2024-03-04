import { Keyboard } from "react-native";
import { useEffect, useState } from "react";
import StartButton from "./StartButton";
import KeyboardIconContainer from "./KeyboardIconContainer";

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

  return isKeyboardVisible ? (
    <KeyboardIconContainer />
  ) : (
    <StartButton {...{ inputFieldRef }} />
  );
};

export default KeyboardAndStartButton;
