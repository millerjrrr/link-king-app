import AppText from "@src/components/AppText";
import { appShadowForStyledComponents } from "@src/utils/appShadow";
import {
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface PanelProps {
  flexDirection?: "row" | "column";
  backgroundColor: string;
  shadowColor: string;
}

interface ManageSubscriptionButtonProps {
  buttonColor: string;
  shadowColor: string;
}

export const Container = styled(View)`
  width: 100%;
  alignitems: flex-start;
  padding: ${base * 15}px;
`;

export const PanelLabel = styled(AppText)<TextStyle>`
  text-align: left;
  padding-vertical: ${base * 5}px;
  font-size: ${base * 20}px;
`;

export const Panel = styled(View)<PanelProps>`
  flex-direction: ${(props) =>
    props.flexDirection || "row"};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  padding: ${base * 15}px;
  border-radius: ${base * 10}px;
  margin-bottom: ${base * 30}px;
  ${(props) =>
    appShadowForStyledComponents(props.shadowColor)}
`;

export const StoreCombo = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const ManageSubscriptionButton = styled(
  TouchableOpacity
)<ManageSubscriptionButtonProps>`
  height: ${base * 50}px;
  width: 100%;
  align-items: center;
  background-color: ${(props) => props.buttonColor};
  padding-horizontal: ${base * 15}px;
  padding-vertical: ${base * 5}px;
  border-radius: ${base * 50}px;
  ${(props) =>
    appShadowForStyledComponents(props.shadowColor)}
`;
