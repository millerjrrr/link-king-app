import { StyleSheet, View } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import Panel from "../../ui/Panel";
import { getSettingsState } from "../../store/settings";

const StatsPanel = ({ children }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
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
    marginTop: 15,
  },
});

export default StatsPanel;
