import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import LevelLine from "./LevelLine";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import colors from "../../utils/colors";

const Histogram = ({ lbd, histHeight }) => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

  [selected, setSelected] = useState(1);
  const heights = lbd.map((row) => row.frequency);
  let maxHeight = Math.max(...heights);

  const normalizedHeights = heights.map(
    (h) => (h * histHeight) / maxHeight,
  );

  return (
    <>
      <View style={styles.histogram}>
        {normalizedHeights.map((_, index) => (
          <LevelLine
            key={index}
            level={index + 1}
            height={normalizedHeights[index]}
            touched={index + 1 === selected}
            onPress={() => {
              setSelected(index + 1);
            }}
          />
        ))}
      </View>
      <Text
        style={[
          styles.text,
          {
            color,
            shadowColor: color,
          },
        ]}
      >
        {heights[selected - 1]}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  histogram: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 30,
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default Histogram;
