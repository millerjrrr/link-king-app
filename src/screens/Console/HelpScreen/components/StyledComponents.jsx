import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import AppText from "../../../../components/AppText";
import { appShadowForStyledComponents } from "@src/utils/appShadow";

export const HelpScroll = styled(ScrollView)`
  width: 100%;
  padding: 30px;
`;

export const CardContainer = styled(View)`
  padding: 15px;
  margin: 10px;
  margin-bottom: 20px;
  align-items: center;
  border-radius: 15px;
  background-color: ${(props) => props.backgroundColor};
  ${(props) => appShadowForStyledComponents(props.color)}
`;

export const ComponentTitle = styled(AppText)`
  padding: 15px;
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

export const ComponentDesc = styled(AppText)`
  color: ${(props) => props.color};
`;
