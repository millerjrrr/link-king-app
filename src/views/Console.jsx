import { View, StyleSheet } from "react-native";
import ConsoleInput from "../console/ConsoleInput";

const Console = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ConsoleInput autoCapitalize={"none"} />
      </View>
      <View style={styles.container}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default Console;
