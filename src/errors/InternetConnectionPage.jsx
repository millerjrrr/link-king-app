import { StyleSheet, View } from "react-native";
import colors from "@assets/themes/colors";
import RefreshButton from "./RefreshButton";
import { getSettingsState } from "@src/store/settings";
import { useSelector } from "react-redux";
import appTextSource from "../utils/appTextSource";
import AppText from "@src/components/AppText";

const InternetConnectionPage = ({ refresh }) => {
  const { colorScheme, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].RED;
  const backgroundColor = colors[colorScheme].PRIMARY;
  const { title, message } =
    appTextSource(appLang).internetConnectionPage;
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <AppText style={{ fontsize: 40, color }}>
        {title}
      </AppText>
      <AppText style={{ color }}>{message}</AppText>
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
});

export default InternetConnectionPage;
