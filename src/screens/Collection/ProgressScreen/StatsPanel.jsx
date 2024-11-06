import { View } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import styled from "styled-components";
import { appShadowForStyledComponents } from "@src/utils/appShadow";

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const Panel = styled(View)`
  width: 100%;
  align-items: center;
  padding: 15px;
  border-radius: 20px;
  shadow-color: ${(props) => props.shadowColor};
  background-color: ${(props) => props.backgroundColor};
  ${appShadowForStyledComponents}
`;

const StatsPanel = ({ children }) => {
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
