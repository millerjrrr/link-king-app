import { View } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import styled from "styled-components/native";
import { appShadowForStyledComponents } from "@src/utils/appShadow";
import { ReactNode } from "react";

interface Props {
  backgroundColor?: string; // Define prop type
  shadowColor?: `#${string}`; // Define prop type
}

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const Panel = styled(View)<Props>`
  width: 100%;
  align-items: center;
  padding: 15px;
  border-radius: 20px;
  background-color: ${(props: Props) =>
    props.backgroundColor || "transparent"};
  ${(props: Props) =>
    appShadowForStyledComponents(
      props.shadowColor || "#000"
    )}
`;

const StatsPanel: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);

  const { CONTRAST, SECONDARY } = colors[colorScheme];
  return (
    <Container>
      <Panel
        shadowColor={CONTRAST[golden]}
        backgroundColor={SECONDARY}
      >
        {children}
      </Panel>
    </Container>
  );
};

export default StatsPanel;
