import ScrollPicker from "react-native-wheel-scrollview-picker";
import React from "react";
import {
  BottomShadow,
  Column,
  ItemPadding,
  ItemText,
  TopShadow,
} from "./StyledComponents";
import useColors from "@src/hooks/utilityHooks/useColors";

interface ScrollSelectorProps {
  onSelect: (value: number) => void;
  length: number;
  start: number;
}
const ScrollSelector: React.FC<ScrollSelectorProps> = ({
  onSelect,
  length,
  start,
}) => {
  const { PRIMARY, CONTRAST } = useColors();
  const topShadowColors = [
    PRIMARY,
    PRIMARY + "E6",
    PRIMARY + "80",
    PRIMARY + "00",
  ];
  const bottomShadowColors = [
    PRIMARY + "00",
    PRIMARY + "80",
    PRIMARY + "E6",
    PRIMARY,
  ];

  // Populate the numbers array with the correct values (index 0 should be excluded)
  const numbersArray = Array.from(
    { length },
    (_, index) => index,
  );

  return (
    <Column>
      <TopShadow colors={topShadowColors} />
      <ScrollPicker
        dataSource={numbersArray}
        selectedIndex={start}
        renderItem={(_, index, isSelected) => {
          return (
            <ItemPadding>
              <ItemText
                fontWeight={isSelected ? "bold" : "normal"}
              >
                {index === 0 ? "" : index}
              </ItemText>
            </ItemPadding>
          );
        }}
        onValueChange={(_, index) => {
          onSelect(index);
        }}
        wrapperHeight={150}
        wrapperBackground="none"
        itemHeight={25}
        highlightColor={CONTRAST}
      />
      <BottomShadow colors={bottomShadowColors} />
    </Column>
  );
};

export default ScrollSelector;
