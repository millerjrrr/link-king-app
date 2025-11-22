import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import AppText from "@src/components/AppText";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: ${base * 90}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-horizontal: ${base * 15}px;
`;

export const OptionContainer = styled(View)`
  flex: 1;
  height: 100%;
  justify-content: center;
  margin: ${base * 10}px;
`;

export const Title = styled(AppText)`
  font-weight: bold;
  padding-vertical: ${base * 5}px;
  text-align: flex-start;
`;

export const SubTitle = styled(AppText)`
  font-size: ${base * 20}px;
  text-align: flex-start;
`;
