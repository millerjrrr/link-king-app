import { StyleSheet, Platform, View } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";

const StatsPanel = ({ children }) => {
  const { golden } = useSelector(getConsoleState);
  return (
    <View
      style={[
        styles.container,
        styles.commonProp,
        { shadowColor: colors.CONTRAST[golden] },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    margin: 40,
    marginTop: 50,
    borderRadius: 20,
    backgroundColor: colors.SECONDARY,
  },
  ...Platform.select({
    ios: {
      commonProp: {
        shadowOffset: {
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
    },
    android: {
      commonProp: {
        elevation: 10,
      },
    },
  }),
});

export default StatsPanel;
