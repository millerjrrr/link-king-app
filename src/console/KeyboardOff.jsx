import {
  View,
  Pressable,
  StyleSheet,
  Keyboard,
} from "react-native";
import colors from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const KeyboardOff = () => {
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
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={styles.option}
    >
      <MaterialCommunityIcons
        name="keyboard-off"
        size={24}
        color={colors.CONTRAST}
      />
    </Pressable>
  ) : null;
};

const styles = StyleSheet.create({
  option: {
    overflow: "hidden",
    width: 500,
    height: 250,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 4,
  },
});

export default KeyboardOff;
