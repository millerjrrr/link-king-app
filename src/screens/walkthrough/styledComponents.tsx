import {
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import AppText from "@components/AppText";
import { appShadowForStyledComponents } from "@src/utils/appShadow";
import useColors from "@src/hooks/utilityHooks/useColors";
import { ReactNode } from "react";

interface Props {
  bg: string;
  color: string;
}

export const TouchableCard = styled(
  TouchableOpacity,
)<Props>`
  width: 100%;
  padding: 15px;
  margin: 20px;
  align-items: center;
  border-radius: 15px;
  background-color: ${(props: Props) => props.bg};
  ${(props: Props) =>
    appShadowForStyledComponents(props.color)};
`;
export const Card = styled(View)<Props>`
  width: 100%;
  padding: 15px;
  margin: 10px;
  align-items: center;
  border-radius: 15px;
  background-color: ${(props: Props) => props.bg};
  ${(props: Props) =>
    appShadowForStyledComponents(props.color)};
`;

const VidCardContainer = styled(View)<Props>`
  width: 100%;
  margin: 10px;
  align-items: center;
  border-radius: 15px;
  border-width: 3px;
  border-color: ${(props: Props) => props.color};
  background-color: ${(props: Props) => props.bg};
  ${(props: Props) =>
    appShadowForStyledComponents(props.color)};
`;

const VidContainer = styled(View)`
  flex: 1;
  overflow: hidden;
  align-items: center;
  margin-vertical: 15px;
`;
export const VidCard: React.FC<{
  children: ReactNode;
  height: number;
}> = ({ children, height }) => {
  const { CONTRAST, PRIMARY } = useColors();

  return (
    <VidCardContainer
      color={CONTRAST}
      bg={PRIMARY}
      style={{
        height,
      }}
    >
      <VidContainer>{children}</VidContainer>
    </VidCardContainer>
  );
};

export const Fill30 = styled(View)`
  height: 30px;
`;

export const HelpScroll = styled(ScrollView)`
  width: 100%;
  padding: 30px;
`;

export const TextBlock: React.FC<{ text: string }> = ({
  text,
}) => {
  const { PRIMARY, CONTRAST } = useColors();
  return (
    <Card color={CONTRAST} bg={PRIMARY}>
      <AppText>{text}</AppText>
    </Card>
  );
};
