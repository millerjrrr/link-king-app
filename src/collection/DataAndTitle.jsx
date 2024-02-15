import { Text, View, StyleSheet } from "react-native";

const DataAndTitle = ({ results }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>results: {results}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 15,
    paddingBottom: 15,
    width: "100%",
    alignItems: "flex-end",
  },
  text: { color: "white", fontSize: 15 },
});

export default DataAndTitle;
