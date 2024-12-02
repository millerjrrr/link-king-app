import AppText from "@src/components/AppText";
import { appShadowForStyledComponents } from "@src/utils/appShadow";
import { TextStyle, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

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
  padding: 15px;
`;

export const PanelLabel = styled(AppText)<TextStyle>`
  text-align: left;
  padding-vertical: 5px;
  font-size: 20px;
`;

export const Panel = styled(View)<PanelProps>`
  flex-direction: ${(props) =>
    props.flexDirection || "row"};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 30px;
  ${(props) =>
    appShadowForStyledComponents(props.shadowColor)}
`;

export const StoreCombo = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const ManageSubscriptionButton = styled(
  TouchableOpacity,
)<ManageSubscriptionButtonProps>`
  height: 50px;
  width: 100%;
  align-items: center;
  background-color: ${(props) => props.buttonColor};
  padding-horizontal: 15px;
  padding-vertical: 5px;
  border-radius: 50px;
  ${(props) =>
    appShadowForStyledComponents(props.shadowColor)}
`;
