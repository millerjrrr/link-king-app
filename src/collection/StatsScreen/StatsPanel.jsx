import { StyleSheet, Platform, View } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";

const StatsPanel = ({ children }) => {
  const { golden } = useSelector(getConsoleState);
  const shadowColor = colors.CONTRAST[golden];
  return (
    <View style={styles.container}>
      <View style={[styles.panel, { shadowColor }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  panel: {
    flex: 1,
    alignItems: "center",
    width: "90%",
    margin: 50,
    padding: 15,
    borderRadius: 20,
    backgroundColor: colors.SECONDARY,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});

export default StatsPanel;
