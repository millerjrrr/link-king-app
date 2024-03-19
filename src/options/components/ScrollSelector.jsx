import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getSettingsState } from "../../store/settings";
import colors from "../../utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import React from "react";

const Column = styled(View)`
  position: relative;
  height: 150px;
  flex-direction: column;
  padding-horizontal: 3px;
`;

const TopShadow = styled(LinearGradient)`
  position: absolute;
  top: 0;
  height: 20px;
  width: 100%;
  z-index: 20;
`;

const BottomShadow = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  height: 20px;
  width: 100%;
  z-index: 20;
`;

const ScrollSelector = ({ onSelect, length, start }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const backgroundColor = colors[colorScheme].PRIMARY;
  const color = colors[colorScheme].CONTRAST[golden];

  const numbersArray = Array.from(
    { length },
    (_, index) => index + 1,
  );

  numbersArray.unshift("");

  return (
    <Column>
      <TopShadow
        {...{
          colors: [
            backgroundColor,
            backgroundColor + "E6",
            backgroundColor + "80",
            backgroundColor + "00",
          ],
        }}
      />
      <ScrollPicker
        dataSource={numbersArray}
        selectedIndex={start}
        renderItem={(data, index, isSelected) => {
          return (
            <View
              style={{
                width: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color,
                  fontWeight: isSelected
                    ? "bold"
                    : "normal",
                }}
              >
                {data}
              </Text>
            </View>
          );
        }}
        onValueChange={(data, selectedIndex) => {
          onSelect(data);
        }}
        wrapperHeight={150}
        wrapperBackground="none"
        itemHeight={25}
      />
      <BottomShadow
        {...{
          colors: [
            backgroundColor + "00",
            backgroundColor + "80",
            backgroundColor + "E6",
            backgroundColor,
          ],
        }}
      />
    </Column>
  );
};

export default ScrollSelector;
