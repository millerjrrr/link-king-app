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
  title: { color: colors.SECONDARY },
});

export default AppLink;
