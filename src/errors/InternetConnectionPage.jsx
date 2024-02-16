import { Text, StyleSheet, View } from "react-native";
import colors from "../utils/colors";

const InternetConnectionPage = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disconnected!</Text>
      <Text style={styles.text}>
        ..looks like you are not connected to the internet.
        This app requires a stable internet connection...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.RED,
    fontSize: 40,
    textAlign: "center",
  },
  text: {
    color: colors.RED,
    fontSize: 20,
    textAlign: "center",
  },
});

export default InternetConnectionPage;
