import { StyleSheet, Pressable, Text } from "react-native";
import colors from "../utils/colors";

const AppLink = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: { color: colors.INACTIVE_CONTRAST, fontSize: 15 },
});

export default AppLink;
