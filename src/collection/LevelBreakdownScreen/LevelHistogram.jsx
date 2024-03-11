import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import LevelLine from "./LevelLine";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getColorsState } from "../../store/colors";

const LevelHistogram = ({ lbd, histHeight }) => {
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const color = colors[colorScheme].CONTRAST[golden];

  [selected, setSelected] = useState(1);
  const heights = lbd.map((row) => row.frequency);
  let maxHeight = Math.max(...heights);

  const normalizedHeights = heights.map(
    (h) => (h * histHeight) / maxHeight,
  );

  return (
    <>
      <View style={styles.levelHistogram}>
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
  levelHistogram: {
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

export default LevelHistogram;
