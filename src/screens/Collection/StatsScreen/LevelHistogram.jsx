import { useState } from "react";
import { View, StyleSheet } from "react-native";
import LevelLine from "./LevelLine";
import { useSelector } from "react-redux";
import colors from "@src/utils/colors";
import { settingsState } from "@src/store/settings";
import AppText from "@src/components/AppText";

const LevelHistogram = ({ lbd, histHeight }) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
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
      <AppText
        style={{
          fontSize: 50,
          fontWeight: "bold",
        }}
      >
        {heights[selected - 1]}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  levelHistogram: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 30,
  },
});

export default LevelHistogram;
