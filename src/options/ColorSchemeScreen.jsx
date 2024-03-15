import { Text, View, StyleSheet } from "react-native";
import PopUpContainer from "../components/containers/PopUpContainer";
import appTextContent from "../utils/appTextContent";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import colors from "../utils/colors";
import ColorSchemeButton from "./components/ColorSchemeButton";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  margin: 15px;
`;

const ColorsContainer = styled(View)`
  flex-direction: row;
  width: 100%;
`;

const TextBlock = styled(Text)`
  padding-vertical: 20px;
  text-align: center;
  font-size: 25px;
  color: ${(props) => props.color};
`;

const ColorSchemeScreen = () => {
  const { title, textA } =
    appTextContent.english.options.colorSchemeScreen;
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <PopUpContainer heading={title}>
      <Container>
        <TextBlock {...{ color }}>{textA}</TextBlock>
        <ColorsContainer>
          <ColorSchemeButton cs="dark" />
          <ColorSchemeButton cs="brasil" />
          <ColorSchemeButton cs="light" />
        </ColorsContainer>
      </Container>
    </PopUpContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ColorSchemeScreen;
