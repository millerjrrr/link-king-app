import { View } from "react-native";
import styled from "styled-components";
import ColorSchemeButton from "./ColorSchemeButton";

const Container = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const ColorPicker = () => {
  return (
    <Container>
      <ColorSchemeButton cs="dark" />
      <ColorSchemeButton cs="brasil" />
      <ColorSchemeButton cs="light" />
    </Container>
  );
};

export default ColorPicker;
