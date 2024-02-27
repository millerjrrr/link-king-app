import { Text, View, StyleSheet } from "react-native";

const EditUserDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>...coming soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "white", fontSize: 30 },
});

export default EditUserDetailsScreen;
