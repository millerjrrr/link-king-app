import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import AppText from "@src/components/AppText";
import { appShadowForStyledComponents } from "@src/utils/appShadow";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface Props {
  backgroundColor?: `#${string}`;
  color?: `#${string}`;
  fontSize?: number;
}

export const Padding = styled(View)`
  width: 100%;
  padding: ${base * 10}px;
`;

export const Container = styled(View)<Props>`
  flex-direction: row;
  border-radius: ${base * 15}px;
  padding: ${base * 5}px;
  background-color: ${(props: Props) =>
    props.backgroundColor};
  ${(props: Props) =>
    appShadowForStyledComponents(props.color || "#ffffff")}
`;

export const InfoContainer = styled(TouchableOpacity)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-horizontal: ${base * 5}px;
`;

export const IconContainer = styled(TouchableOpacity)`
  margin: 0 ${base * 10}px 0 ${base * 15}px;
  justify-content: center;
`;

export const RowContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(AppText)<Props>`
  font-size: ${(props: Props) => props.fontSize}px;
  font-weight: bold;
  align-items: flex-start;
  justify-content: center;
  margin-left: ${base * 5}px;
  color: ${(props: Props) => props.color};
`;

export const Rating = styled(AppText)<Props>`
  padding: 0;
  font-size: ${base * 20}px;
  color: ${(props: Props) => props.color};
`;

export const Date = styled(AppText)<Props>`
  font-size: ${base * 20}px;
  font-style: italic;
  color: ${(props: Props) => props.color};
`;

export const LevelStarsContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  margin-left: ${base * 5}px;
  justify-content: left;
`;
