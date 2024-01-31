import { View, Pressable, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const OptionsContainer = ({ sound, blurred, timer }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => console.log("PressedOne")}
        style={styles.option}
      >
        {sound ? (
          <MaterialIcons
            name="volume-up"
            size={48}
            color={colors.CONTRAST}
          />
        ) : (
          <MaterialIcons
            name="volume-off"
            size={48}
            color={colors.CONTRAST}
          />
        )}
      </Pressable>
      <Pressable
        onPress={() => console.log("PressedOne")}
        style={styles.option}
      >
        {!blurred ? (
          <Entypo
            name="eye"
            size={48}
            color={colors.CONTRAST}
          />
        ) : (
          <Entypo
            name="eye-with-line"
            size={48}
            color={colors.CONTRAST}
          />
        )}
      </Pressable>
      <Pressable
        onPress={() => console.log("PressedOne")}
        style={styles.option}
      >
        {timer ? (
          <MaterialIcons
            name="timer"
            size={48}
            color={colors.CONTRAST}
          />
        ) : (
          <MaterialIcons
            name="timer-off"
            size={48}
            color={colors.CONTRAST}
          />
        )}
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
    borderRadius: 15,
    overflow: "hidden",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.CONTRAST,
    margin: 8,
  },
});

export default OptionsContainer;
