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

interface Props {
  backgroundColor?: string; // Define prop type
  size?: string; // Define prop type
  color: string; // Define prop type
}

export const ModalContainer = styled(View)<{
  backgroundColor: string;
  color: string;
}>`
  padding-horizontal: 5px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props: Props) =>
    props.backgroundColor};
  ${(props: Props) =>
    appShadowForStyledComponents(props.color)}
`;
export const WebViewContainer = styled(View)`
  padding-horizontal: 5px;
  padding-vertical: 10px;
  border-radius: 10px;
  height: ${height * 0.7}px;
  width: 100%;
`;

export const NewWordModalContainer = styled(View)`
  padding-horizontal: 5px;
  padding-vertical: 10px;
  border-radius: 10px;
  width: 100%;
`;

export const NewWordHeader = styled(AppText)`
  font-size: 15px;
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
  color: ${(props: Props) => props.color};
`;

export const ButtonText = styled(AppText)<
  TextStyle & { color: string; size: number }
>`
  margin: 15px;
  font-size: ${(props: Props) => props.size}px;
  color: ${(props: Props) => props.color};
`;

export const ButtonContainer = styled(TouchableOpacity)<{
  color: string;
}>`
  width: 100%;
  border-top-color: ${(props: Props) => props.color};
  border-top-width: ${Platform.OS === "android"
    ? 0.5
    : 0.2}px;
`;
