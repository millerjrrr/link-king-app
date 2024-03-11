import { StyleSheet, View } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import Panel from "../../ui/Panel";
import { getColorsState } from "../../store/colors";

const StatsPanel = ({ children }) => {
  const { colorScheme, golden } =
    useSelector(getColorsState);
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
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    marginTop: 50,
  },
});

export default StatsPanel;
