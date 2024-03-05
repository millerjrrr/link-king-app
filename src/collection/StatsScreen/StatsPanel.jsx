import { StyleSheet, Platform, View } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import Panel from "../../ui/Panel";

const StatsPanel = ({ children }) => {
  const { golden } = useSelector(getConsoleState);
  const shadowColor = colors.CONTRAST[golden];
  return (
    <View style={styles.container}>
      <Panel {...{ shadowColor }}>{children}</Panel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    marginTop: 50,
  },
});

export default StatsPanel;
