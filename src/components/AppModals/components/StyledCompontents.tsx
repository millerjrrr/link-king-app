import {
  Platform,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import AppText from "../../AppText";
import { appShadowForStyledComponents } from "@src/utils/appShadow";
import screenDimensions from "@src/utils/screenDimensions";
const { base, width, height } = screenDimensions();

interface Props {
  backgroundColor?: `#${string}`; // Define prop type
  size?: number; // Define prop type
  color: `#${string}`; // Define prop type
}

// width: ${width - 10}px;
export const ModalContainer = styled(View)<Props>`
  width: ${width - 30}px;
  padding-horizontal: ${base * 5}px;
  border-radius: ${base * 10}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "transparent"};
  ${({ color }) =>
    appShadowForStyledComponents(color || "#000")}
`;

export const WebViewContainer = styled(View)`
  padding-horizontal: ${base * 5}px;
  padding-vertical: ${base * 10}px;
  border-radius: ${base * 10}px;
  height: ${height * 0.7}px;
  width: 100%;
`;

export const NewWordModalContainer = styled(View)`
  padding-horizontal: ${base * 5}px;
  padding-vertical: ${base * 10}px;
  border-radius: ${base * 10}px;
  width: 100%;
`;

export const NewWordHeader = styled(AppText)`
  font-size: ${base * 15}px;
  padding-bottom: ${base * 10}px;
`;

export const XBarContainer = styled(TouchableOpacity)`
  padding-top: ${base * 5}px;
  align-items: flex-end;
  width: 100%;
`;

export const ModalText = styled(AppText)<TextStyle & Props>`
  padding-horizontal: ${base * 10}px;
  padding-bottom: ${base * 10}px;
  color: ${(props: Props) => props.color};
`;

export const ButtonText = styled(AppText)<
  TextStyle & Props
>`
  margin: ${base * 15}px;
  font-size: ${(props: Props) => props.size}px;
  color: ${(props: Props) => props.color};
`;

export const ButtonContainer = styled(
  TouchableOpacity
)<Props>`
  width: 100%;
  border-top-color: ${(props: Props) => props.color};
  border-top-width: ${Platform.OS === "android"
    ? 0.5 * base
    : 0.2 * base}px;
`;
