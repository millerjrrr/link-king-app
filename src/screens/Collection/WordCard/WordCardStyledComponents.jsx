import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import AppText from "@src/components/AppText";

export const Container = styled(View)`
  flex-direction: row;
  margin: 10px;
  border-radius: 15px;
  padding: 5px;
  background-color: ${(props) => props.backgroundColor};
  shadow-color: ${(props) => props.color};
  border-color: ${(props) => props.color};
`;

export const InfoContainer = styled(TouchableOpacity)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-horizontal: 15px;
`;

export const RowContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(AppText)`
  height: 40px;
  font-size: ${(props) => props.fontSize}px;
  font-weight: bold;
  align-items: flex-start;
  color: ${(props) => props.color};
`;

export const Rating = styled(AppText)`
  font-size: 20px;
  color: ${(props) => props.color};
`;

export const Date = styled(AppText)`
  font-size: 20px;
  font-style: italic;
  color: ${(props) => props.color};
`;

export const LevelStarsContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: left;
`;
