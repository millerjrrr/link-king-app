import { ScrollView, Text } from "react-native";
import styled from "styled-components";
import PopUpContainer from "./../components/containers/PopUpContainer";
import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import colors from "../utils/colors";
import appTextSource from "../utils/appTextSource";

const Container = styled(ScrollView)`
  margin: 15px;
`;

const TextBlock = styled(Text)`
  padding-vertical: 20px;
  text-align: center;
  font-size: 30px;
  color: ${(props) => props.color};
`;

const VoiceSelectionScreen = () => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const { title, textA, textB, tip } =
    appTextSource[appLang].options.voiceSelection;

  return (
    <PopUpContainer heading={title}>
      <Container>
        <TextBlock {...{ color }}>{textA}</TextBlock>
        <TextBlock {...{ color }}>{textB}</TextBlock>
        <TextBlock {...{ color }}>{tip}</TextBlock>
      </Container>
    </PopUpContainer>
  );
};

export default VoiceSelectionScreen;
