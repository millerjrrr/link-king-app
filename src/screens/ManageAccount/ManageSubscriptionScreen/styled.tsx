import AppText from "@src/components/AppText";
import { TextStyle, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";

interface PanelProps {
  flexDirection?: "row" | "column";
  backgroundColor: string;
}

interface ManageSubscriptionButtonProps {
  userIsSubscribed: boolean;
  buttonColor: string;
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
`;

export const StoreCombo = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const ManageSubscriptionButton = styled(
  TouchableOpacity,
)<ManageSubscriptionButtonProps>`
  width: ${(props) => {
    return !props.userIsSubscribed ? "100%" : null;
  }};
  height: 50px;
  align-items: center;
  background-color: ${(props) => props.buttonColor};
  padding-horizontal: 10px;
  padding-vertical: 5px;
  border-radius: 20px;
`;
