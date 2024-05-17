import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  height: 90px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-horizontal: 15px;
  background-color: ${(props) => props.backgroundColor};
  border-color: ${(props) => props.borderColor};
  border-top-width: ${(props) => props.borderTopWidth}px;
`;

export const OptionContainer = styled(View)`
  flex: 1;
  height: 100%;
  justify-content: center;
  margin: 10px;
`;

export const Title = styled(Text)`
  color: ${(props) => props.color};
  font-size: 25px;
  font-weight: bold;
  padding-vertical: 5px;
`;

export const SubTitle = styled(Text)`
  color: ${(props) => props.color};
  font-size: 20px;
`;
