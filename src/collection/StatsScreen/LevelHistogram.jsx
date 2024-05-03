import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import LevelLine from "./LevelLine";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";

const LevelHistogram = ({ lbd, histHeight }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  [selected, setSelected] = useState(1);
  const heights = lbd.map((row) => row.frequency);
  let maxHeight = Math.max(...heights);

  const normalizedHeights = heights.map(
    (h) => (h * histHeight) / maxHeight,
  );

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  levelHistogram: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 30,
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LevelHistogram;
