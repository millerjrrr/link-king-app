import { View, StyleSheet } from "react-native";
import colors from "@src/utils/colors";
import { settingsState } from "@src/store/settings";
import { useSelector } from "react-redux";
import { redCoverState } from "@src/store/redCover";

const BloodRedCover = () => {
  const { colorScheme } = useSelector(settingsState);
  const backgroundColor = colors[colorScheme].LIGHTRED;
  const { elapsedTime, redCoverZIndex } =
    useSelector(redCoverState);

  return (
    <View
      style={[styles.container, { zIndex: redCoverZIndex }]}
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
