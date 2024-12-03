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

const { width, height } = screenDimensions();

export const ModalContainer = styled(View)<{
  backgroundColor: string;
  color: string;
}>`
  width: ${width * 0.85}px;
  padding-horizontal: 5px;
  border-radius: 10px;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  ${(props) => appShadowForStyledComponents(props.color)}
`;
export const WebViewContainer = styled(View)`
  padding-horizontal: 5px;
  padding-vertical: 10px;
  border-radius: 10px;
  height: ${height * 0.7};
  width: 100%;
`;

export const NewWordModalContainer = styled(View)`
  padding-horizontal: 5px;
  padding-vertical: 10px;
  border-radius: 10px;
  width: 100%;
`;

export const NewWordHeader = styled(AppText)`
  font-size: 25px;
  padding-bottom: 10px;
`;

export const XBarContainer = styled(TouchableOpacity)`
  padding-top: 5px;
  align-items: flex-end;
  width: 100%;
`;

export const ModalText = styled(AppText)<
  TextStyle & { color: string }
>`
  padding-horizontal: 10px;
  padding-bottom: 10px;
  color: ${(props) => props.color};
`;

export const ButtonText = styled(AppText)<
  TextStyle & { color: string; size: number }
>`
  margin: 15px;
  font-size: ${(props) => props.size}px;
  color: ${(props) => props.color};
`;

export const ButtonContainer = styled(TouchableOpacity)<{
  color: string;
}>`
  width: 100%;
  border-top-color: ${(props) => props.color};
  border-top-width: ${Platform.OS === "android"
    ? 0.5
    : 0.2}px;
`;
