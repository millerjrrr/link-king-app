import { View, StyleSheet } from "react-native";
import colors from "../utils/colors";

const BloodRedCover = ({ elapsedTime }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: colors.LIGHTRED,
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
