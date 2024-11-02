import { StyleSheet, View } from "react-native";
import colors from "@src/utils/colors";
import { getSettingsState } from "@src/store/settings";
import { useSelector } from "react-redux";
import appShadow from "@src/utils/appShadow";

const Panel = ({ shadowColor, dark, children }) => {
  const { colorScheme } = useSelector(getSettingsState);
  const backgroundColor = dark
    ? colors["dark"].SECONDARY
    : colors[colorScheme].SECONDARY;
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
    padding: 15,
    borderRadius: 20,
    ...appShadow(),
  },
});

export default Panel;
