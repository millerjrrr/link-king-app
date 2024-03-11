import { StyleSheet, Platform, View } from "react-native";
import colors from "../utils/colors";
import { getColorsState } from "../store/colors";
import { useSelector } from "react-redux";

const Panel = ({ shadowColor, children }) => {
  const { colorScheme } = useSelector(getColorsState);
  const backgroundColor = colors[colorScheme].SECONDARY;
  return (
    <View
      style={[
        styles.container,
        { shadowColor, backgroundColor },
      ]}
    >
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
