import { View, StyleSheet } from "react-native";
import colors from "@assets/themes/colors";
import { getSettingsState } from "@src/store/settings";
import { useSelector } from "react-redux";

const BloodRedCover = ({ elapsedTime, coverZIndex }) => {
  const { colorScheme } = useSelector(getSettingsState);
  const backgroundColor = colors[colorScheme].LIGHTRED;
  return (
    <View
      style={[styles.container, { zIndex: coverZIndex }]}
    >
      <View
        style={{
          backgroundColor,
          width: `${Math.min(elapsedTime / 3, 1) * 100}%`,
          height: "100%",
          position: "absolute",
          top: 0,
          bottom: 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
});

export default BloodRedCover;
