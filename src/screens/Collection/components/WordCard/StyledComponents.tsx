import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import AppText from "@src/components/AppText";
import { appShadowForStyledComponents } from "@src/utils/appShadow";

export const Padding = styled(View)`
  width: 100%;
  padding: 10px;
`;
export const Container = styled(View)<{
  backgroundColor: string;
  color: string;
}>`
  flex-direction: row;
  border-radius: 15px;
  padding: 5px;
  background-color: ${(props) => props.backgroundColor};
  ${(props) => appShadowForStyledComponents(props.color)}
`;

export const InfoContainer = styled(TouchableOpacity)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-horizontal: 15px;
`;

export const InfoContainerView = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-horizontal: 15px;
`;

export const IconContainer = styled(TouchableOpacity)`
  margin: 0 10px 0 15px;
  justify-content: center;
`;

export const RowContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(AppText)<{
  fontSize: number;
  color: string;
}>`
  font-size: ${(props) => props.fontSize}px;
  font-weight: bold;
  align-items: flex-start;
  justify-content: center;
  color: ${(props) => props.color};
`;

export const Rating = styled(AppText)<{
  color: string;
}>`
  padding: 0;
  font-size: 20px;
  color: ${(props) => props.color};
`;

export const Date = styled(AppText)<{
  color: string;
}>`
  font-size: 20px;
  font-style: italic;
  color: ${(props) => props.color};
`;

export const LevelStarsContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: left;
`;
