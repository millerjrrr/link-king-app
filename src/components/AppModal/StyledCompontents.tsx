import {
  Platform,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import AppText from "../AppText";
import { appShadowForStyledComponents } from "@src/utils/appShadow";

export const ModalContainer = styled(View)<{
  backgroundColor: string;
  color: string;
}>`
  padding-horizontal: 5px;
  border-radius: 10px;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  shadow-color: ${(props) => props.color};
  ${appShadowForStyledComponents}
`;
export const WebViewContainer = styled(View)`
  padding-horizontal: 5px;
  padding-vertical: 10px;
  border-radius: 10px;
  height: 550px;
  width: 100%;
`;

export const XBarContainer = styled(TouchableOpacity)`
  padding-bottom: 5px;
  align-items: flex-end;
  width: 100%;
`;

export const ModalText = styled(AppText)<
  TextStyle & { color: string }
>`
  margin: 20px;
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
