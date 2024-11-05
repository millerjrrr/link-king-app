import { StyleSheet, View } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import Panel from "@src/components/Panel";
import { settingsState } from "@src/store/settings";

const StatsPanel = ({ children }) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const shadowColor = colors[colorScheme].CONTRAST[golden];
  return (
    <View style={styles.container}>
      <Panel {...{ shadowColor }}>{children}</Panel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});

export default StatsPanel;
