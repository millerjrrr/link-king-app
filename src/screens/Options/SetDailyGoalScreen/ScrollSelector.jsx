import { View } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import React from "react";
import AppText from "@src/components/AppText";

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
  const { colorScheme, golden } =
    useSelector(settingsState);
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
              <AppText
                style={{
                  fontSize: 20,
                  fontWeight: isSelected
                    ? "bold"
                    : "normal",
                }}
              >
                {data}
              </AppText>
            </View>
          );
        }}
        onValueChange={(data, selectedIndex) => {
          onSelect(data);
        }}
        wrapperHeight={150}
        wrapperBackground="none"
        itemHeight={25}
        highlightColor={color}
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
