import { Text, StyleSheet, View } from "react-native";
import colors from "../utils/colors";
import RefreshButton from "./RefreshButton";
import { getSettingsState } from "../store/settings";
import { useSelector } from "react-redux";
import appTextSource from "./../utils/appTextSource/index";

const InternetConnectionPage = ({ refresh }) => {
  const { colorScheme, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].RED;
  const backgroundColor = colors[colorScheme].PRIMARY;
  const { title, message } =
    appTextSource[appLang].internetConnectionPage;
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color }]}>{title}</Text>
      <Text style={[styles.text, { color }]}>
        {message}
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
