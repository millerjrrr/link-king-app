import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import AppText from "@src/components/AppText";
import { appShadowForStyledComponents } from "@src/utils/appShadow";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface Props {
  backgroundColor?: string;
  color: string;
  fontSize?: number;
}

export const Padding = styled(View)`
  width: 100%;
  padding: ${base * 10}px;
`;

export const Container = styled(View)<{
  backgroundColor: string;
  color: string;
}>`
  margin-top: ${base * 15}px;
  flex-direction: row;
  border-radius: ${base * 15}px;
  padding: ${base * 5}px;
  background-color: ${(props: Props) =>
    props.backgroundColor};
  ${(props: Props) =>
    appShadowForStyledComponents(props.color)}
`;

export const InfoContainer = styled(TouchableOpacity)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-horizontal: ${base * 15}px;
`;

export const RowContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Name = styled(AppText)<{
  fontSize: number;
  color: string;
}>`
  font-size: ${(props: Props) =>
    props.fontSize ? props.fontSize * base : 20 * base}px;
  font-weight: bold;
  align-items: flex-start;
  justify-content: center;
  color: ${(props: Props) => props.color};
`;

export const Email = styled(AppText)<{
  fontSize: number;
  color: string;
}>`
  font-size: ${(props: Props) =>
    props.fontSize ? props.fontSize * base : 20 * base}px;
  align-items: flex-start;
  justify-content: center;
  color: ${(props: Props) => props.color};
`;

export const Rating = styled(AppText)<{
  color: string;
}>`
  padding: 0;
  font-size: ${base * 20}px;
  color: ${(props: Props) => props.color};
`;

export const LastPlayed = styled(AppText)<{
  color: string;
}>`
  font-size: ${base * 20}px;
  font-style: italic;
  color: ${(props: Props) => props.color};
`;
export const TimePlayed = styled(AppText)<{
  color: string;
}>`
  font-size: ${base * 20}px;
  font-style: italic;
  color: ${(props: Props) => props.color};
`;

export const WordsCollected = styled(AppText)<{
  color: string;
}>`
  font-size: ${base * 20}px;
  font-style: italic;
  color: ${(props: Props) => props.color};
`;
