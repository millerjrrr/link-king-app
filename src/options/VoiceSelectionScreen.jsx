import { Text, View, StyleSheet } from "react-native";
import appTextContent from "./../utils/appTextContent";
import styled from "styled-components";
import PopUpContainer from "./../components/containers/PopUpContainer";
import { useSelector } from "react-redux";
import { getColorsState } from "../store/colors";
import colors from "../utils/colors";

const Container = styled(View)`
  align-items: center;
  margin: 15px;
`;

const TextBlock = styled(Text)`
  padding-vertical: 20px;
  text-align: center;
  font-size: 30px;
  color: ${(props) => props.color};
`;

const VoiceSelectionScreen = () => {
  const { title, textA, textB, tip } =
    appTextContent.english.options.voiceSelectionScreen;

  const { colorScheme, golden } =
    useSelector(getColorsState);

  const color = colors[colorScheme].CONTRAST[golden];

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

const styles = StyleSheet.create({
  container: {},
});

export default VoiceSelectionScreen;
