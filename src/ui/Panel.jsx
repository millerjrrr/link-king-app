import { StyleSheet, View } from "react-native";
import colors from "../utils/colors";
import { getSettingsState } from "../store/settings";
import { useSelector } from "react-redux";
import appShadow from "../utils/appShadow";

const Panel = ({ shadowColor, children }) => {
  const { colorScheme } = useSelector(getSettingsState);
  const backgroundColor = colors[colorScheme].SECONDARY;
  return (
    <View
      style={[
        styles.container,
        {
          shadowColor,
          backgroundColor,
          borderColor: shadowColor,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 100,
    padding: 20,
    borderRadius: 20,
    ...appShadow(),
  },
});

export default Panel;
