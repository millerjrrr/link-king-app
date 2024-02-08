import { Feather } from "@expo/vector-icons";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import colors from "../utils/colors";
import { speak } from "expo-speech";

const ReadWordButton = ({ attempt, options }) => {
  const readWord = async () => {
    console.log("PressedReadWord");
    speak(attempt.target, {
      language: attempt.speechLang,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={readWord}
        style={styles.targetWord}
      >
        {options.blurred ? (
          <Feather
            name="volume-2"
            size={48}
            color={colors.CONTRAST}
          />
        ) : (
          <Text style={styles.target}>
            {attempt.target}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 10,
  },
  target: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 40,
    color: colors.CONTRAST,
  },
  targetWord: {
    height: 60,
    justifyContent: "center",
  },
});

export default ReadWordButton;
