import { useState } from "react";
import { View, StyleSheet } from "react-native";
import LevelLine from "./LevelLine";
import AppText from "@src/components/AppText";
import useColors from "@src/hooks/utilityHooks/useColors";
import appShadow from "@src/utils/appShadow";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const LevelHistogram: React.FC<{
  lbd: any[];
  histHeight: number;
}> = ({ lbd, histHeight }) => {
  const [selected, setSelected] = useState(1);
  const heights = lbd.map((row) => row.frequency);
  let maxHeight = Math.max(...heights);

  const normalizedHeights = heights.map(
    (h) => (h * histHeight) / maxHeight
  );
  const { CONTRAST, SECONDARY } = useColors();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.levelHistogram,
          {
            backgroundColor: SECONDARY,
            ...appShadow(CONTRAST),
          },
        ]}
      >
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
          padding: base * 10,
        }}
      >
        {heights[selected - 1]}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  levelHistogram: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: base * 10,
    borderRadius: 10,
  },
});

export default LevelHistogram;
