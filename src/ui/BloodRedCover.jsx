import { View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { getSettingsState } from "../store/settings";
import { useSelector } from "react-redux";

const BloodRedCover = ({ elapsedTime }) => {
  const { colorScheme } = useSelector(getSettingsState);
  const backgroundColor = colors[colorScheme].LIGHTRED;
  return (
    <View style={styles.container}>
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
    zIndex: 2,
  },
});

export default BloodRedCover;
