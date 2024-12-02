import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import AppText from "@src/components/AppText";

export const Container = styled(TouchableOpacity)`
  width: 100%;
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

export const Title = styled(AppText)`
  color: ${(props) => props.color};
  font-weight: bold;
  padding-vertical: 5px;
  text-align: flex-start;
`;

export const SubTitle = styled(AppText)`
  color: ${(props) => props.color};
  font-size: 20px;
  text-align: flex-start;
`;
