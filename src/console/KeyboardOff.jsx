import {
  View,
  Pressable,
  StyleSheet,
  Keyboard,
} from "react-native";
import colors from "../utils/colors";
import {
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";

const KeyboardOff = ({ dontKnowFunction }) => {
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
            size={36}
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
    alignItems: "center",
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

export default KeyboardOff;
