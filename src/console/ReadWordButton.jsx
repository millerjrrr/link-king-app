import { Feather } from "@expo/vector-icons";
import { View, Pressable, StyleSheet } from "react-native";
import colors from "../utils/colors";
import * as Speech from "expo-speech";

const ReadWordButton = ({ attempt }) => {
  const readWord = async () => {
    console.log("PressedreadWord");
    Speech.speak(attempt.target, {
      language: attempt.speechLang,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={readWord} style={styles.option}>
        <Feather
          name="volume-2"
          size={48}
          color={colors.CONTRAST}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
  },
  option: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 15,
    overflow: "hidden",
    width: 150,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
});

export default ReadWordButton;
