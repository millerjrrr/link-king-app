import React, { useRef, useState } from "react";
import {
  FlatList,
  View,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useColors from "@src/hooks/utilityHooks/useColors";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface ScrollSelectorProps {
  onSelect: (value: number) => void;
  length: number;
  start: number;
}

const ITEM_HEIGHT = base * 40;

const ScrollSelector: React.FC<ScrollSelectorProps> = ({
  onSelect,
  length,
  start,
}) => {
  const { PRIMARY, CONTRAST } = useColors();
  const [selectedIndex, setSelectedIndex] = useState(start);
  const listRef = useRef<FlatList<number>>(null);
  const data = Array.from({ length }, (_, i) => i);

  const handleScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.round(
      e.nativeEvent.contentOffset.y / ITEM_HEIGHT
    );
    setSelectedIndex(index);
    onSelect(index);
  };

  return (
    <View
      style={{
        height: ITEM_HEIGHT * 5,
        overflow: "hidden",
        alignItems: "center",
      }}
    >
      {/* Top fade */}
      <LinearGradient
        colors={[
          PRIMARY,
          PRIMARY + "E6",
          PRIMARY + "80",
          PRIMARY + "00",
        ]}
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: ITEM_HEIGHT * 2,
        }}
      />
      {/* The list */}
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item) => item.toString()}
        initialScrollIndex={start}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item, index }) => (
          <View
            style={{
              height: ITEM_HEIGHT,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: base * 20,
                color: CONTRAST,
                fontWeight:
                  index === selectedIndex
                    ? "bold"
                    : "normal",
              }}
            >
              {index === 0 ? "" : item}
            </Text>
          </View>
        )}
      />
      {/* Bottom fade */}
      <LinearGradient
        colors={[
          PRIMARY + "00",
          PRIMARY + "80",
          PRIMARY + "E6",
          PRIMARY,
        ]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: ITEM_HEIGHT * 2,
        }}
      />
    </View>
  );
};

export default ScrollSelector;
