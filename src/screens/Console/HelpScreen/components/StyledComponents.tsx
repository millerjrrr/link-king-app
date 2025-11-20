import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import AppText from "../../../../components/AppText";
import { appShadowForStyledComponents } from "@src/utils/appShadow";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface Props {
  backgroundColor?: `#${string}`;
  color: `#${string}`;
}
export const HelpScroll = styled(ScrollView)`
  width: 100%;
  padding: ${base * 30}px;
`;

export const CardContainer = styled(View)<Props>`
  padding: ${base * 15}px;
  margin: ${base * 10}px;
  margin-bottom: ${base * 20}px;
  align-items: center;
  border-radius: ${base * 15}px;
  background-color: ${(props: Props) =>
    props.backgroundColor};
  ${(props: Props) =>
    appShadowForStyledComponents(props.color)}
`;

export const ComponentTitle = styled(AppText)<Props>`
  padding: ${base * 15}px;
  font-size: ${base * 30}px;
  font-weight: bold;
  color: ${(props: Props) => props.color};
`;

export const ComponentDesc = styled(AppText)<Props>`
  color: ${(props: Props) => props.color};
`;
