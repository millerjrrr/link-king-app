import { Text, StyleSheet, View } from "react-native";
import colors from "../utils/colors";
import RefreshButton from "./RefreshButton";
import { getColorsState } from "../store/colors";
import { useSelector } from "react-redux";

const InternetConnectionPage = ({ refresh }) => {
  const { colorScheme } = useSelector(getColorsState);
  const color = colors[colorScheme].RED;
  const backgroundColor = colors[colorScheme].PRIMARY;
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color }]}>
        Disconnected!
      </Text>
      <Text style={[styles.text, { color }]}>
        ..looks like you are not connected to the internet.
        This app requires a stable internet connection...
      </Text>
      <RefreshButton refresh={refresh} />
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
    fontSize: 40,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default InternetConnectionPage;
