import { Text, View, StyleSheet } from "react-native";

const Stats = (props) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: "white" }}>
        Stats
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Stats;
