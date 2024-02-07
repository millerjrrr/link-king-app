import { View, StyleSheet } from "react-native";
import colors from "../utils/colors";

const size = 15;

const Circle = ({ color }) => {
  return (
    <View
      style={{
        borderRadius: size / 2,
        height: size,
        width: size,
        backgroundColor: color,
        borderWidth: 1,
        borderColor: colors.INACTIVE_CONTRAST,
        margin: 8,
      }}
    />
  );
};

const SliderCircleIndicator = ({ tabNumber }) => {
  return (
    <View style={styles.container}>
      {tabNumber === 0 ? (
        <Circle color={colors.INACTIVE_CONTRAST} />
      ) : (
        <Circle />
      )}
      {tabNumber === 1 ? (
        <Circle color={colors.INACTIVE_CONTRAST} />
      ) : (
        <Circle />
      )}
      {tabNumber === 2 ? (
        <Circle color={colors.INACTIVE_CONTRAST} />
      ) : (
        <Circle />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default SliderCircleIndicator;
