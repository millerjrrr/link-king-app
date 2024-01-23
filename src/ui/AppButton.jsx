import { Text, StyleSheet, Pressable } from "react-native";
import colors from "../utils/colors";

const AppButton = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    backgroundColor: colors.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
});

export default AppButton;
