import AppText from "@src/components/AppText";
import screenDimensions from "@src/utils/screenDimensions";
import { LinearGradient } from "expo-linear-gradient";
import { TextStyle, View } from "react-native";
import styled from "styled-components/native";
const { height, width } = screenDimensions();

// index
export const Container = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;

export const GoalContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${width - 30}px;
`;

// Scroll Selector
export const Column = styled(View)`
  position: relative;
  height: ${height * 0.2}px;
  flex-direction: column;
  padding-horizontal: 3px;
`;

export const TopShadow = styled(LinearGradient)`
  position: absolute;
  top: 0;
  height: 20px;
  width: 100%;
  z-index: 20;
`;

export const BottomShadow = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  height: 20px;
  width: 100%;
  z-index: 20;
`;

export const ItemPadding = styled(View)`
  width: 40px;
  align-items: center;
  justify-content: center;
`;

export const ItemText = styled(AppText)<
  TextStyle & { fontWeight: "bold" | "normal" }
>`
  font-size: 20px;
  font-weight: ${(props) => props.fontWeight};
`;

//Dropdown Selector
export const DropdownContainer = styled(View)`
  overflow: hidden;
  border-radius: 8px;
`;
