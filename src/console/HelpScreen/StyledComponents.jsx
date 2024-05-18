import { Platform, ScrollView, View } from "react-native";
import styled from "styled-components";
import AppText from "../../ui/AppText";

export const HelpScroll = styled(ScrollView)`
  width: 100%;
  padding: 30px;
`;

export const CardContainer = styled(View)`
  padding: 15px;
  margin-bottom: 20px;
  align-items: center;
  border-radius: 15px;
  background-color: ${(props) => props.backgroudColor};
  shadow-color: ${(props) => props.color};
  border-color: ${(props) => props.color};
  ${Platform.select({
    ios: `
    shadow-offset: 1px 1px;
    shadow-opacity: 0.5;
    shadow-radius: 3px;
  `,
    android: `
    elevation: 3;
    border-width: 1px;
  `,
  })};
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
