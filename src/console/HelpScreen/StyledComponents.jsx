import {
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import styled from "styled-components";

export const HelpScroll = styled(ScrollView)`
  width: 100%;
  padding: 30px;
  padding-bottom: 100px;
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

export const ComponentTitle = styled(Text)`
  padding: 15px;
  font-size: 30px;
  color: ${(props) => props.color};
  text-align: center;
`;

export const ComponentDesc = styled(Text)`
  font-size: 25px;
  color: ${(props) => props.color};
  text-align: center;
`;
