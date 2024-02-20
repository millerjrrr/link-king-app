import { View, StyleSheet, Platform } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const size = 15;

const Circle = ({ color, on }) => {
  const shadowColor = on ? color : null;
  return (
    <View
      style={{
        borderRadius: size / 2,
        height: size,
        width: size,
        backgroundColor: colors.SECONDARY,
        margin: 8,
        shadowColor,
        ...Platform.select({
          ios: {
            shadowOffset: {
              height: 1,
            },
            shadowOpacity: 0.9,
            shadowRadius: 10,
          },
          android: {
            elevation: 3,
          },
        }),
      }}
    />
  );
};

const SliderCircleIndicator = ({ tabNumber }) => {
  const { golden } = useSelector(getConsoleState);

  return (
    <View style={styles.container}>
      <Circle
        color={colors.CONTRAST[golden]}
        on={tabNumber === 0}
      />
      <Circle
        color={colors.CONTRAST[golden]}
        on={tabNumber === 1}
      />
      <Circle
        color={colors.CONTRAST[golden]}
        on={tabNumber === 2}
      />
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
