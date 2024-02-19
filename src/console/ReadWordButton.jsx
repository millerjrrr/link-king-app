import { Feather } from "@expo/vector-icons";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import colors from "../utils/colors";
import { speak } from "expo-speech";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const ReadWordButton = () => {
  const { attempt, options, golden } =
    useSelector(getConsoleState);

  const readWord = async () => {
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
            color={colors.CONTRAST[golden]}
          />
        ) : (
          <Text
            style={[
              styles.target,
              { color: colors.CONTRAST[golden] },
            ]}
          >
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
  },
  targetWord: {
    height: 60,
    justifyContent: "center",
  },
});

export default ReadWordButton;
