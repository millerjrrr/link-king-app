import { StyleSheet, Platform, View } from "react-native";
import colors from "../utils/colors";

const Panel = ({ shadowColor, children }) => {
  return (
    <View style={[styles.container, { shadowColor }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 100,
    padding: 20,
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

export default Panel;
