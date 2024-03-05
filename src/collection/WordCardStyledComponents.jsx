import { Text, View } from "react-native";
import colors from "../utils/colors";
import styled from "styled-components";

export const Container = styled(View)`
  flex-direction: row;
  margin: 10px;
  border-radius: 15px;
  padding: 5px;
  background-color: ${colors.SECONDARY};
  shadow-color: ${(props) => props.color};
`;

export const InfoContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  padding-horizontal: 15px;
`;

export const RowContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  align-items: flex-start;
  color: ${(props) => props.color};
`;

export const Rating = styled(Text)`
  font-size: 20px;
  color: ${(props) => props.color};
`;

export const Date = styled(Text)`
  font-size: 20px;
  font-style: italic;
  color: ${(props) => props.color};
`;

export const LevelStarsContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: left;
`;
