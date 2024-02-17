import { StyleSheet, Platform, View } from "react-native";
import colors from "../utils/colors";

const StatsPanel = ({ children }) => {
  return (
    <View style={[styles.container, styles.commonProp]}>
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
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.SECONDARY,
    shadowColor: colors.CONTRAST,
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
