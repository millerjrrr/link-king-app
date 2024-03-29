import { View } from "react-native";
import styled from "styled-components";
import ColorSchemeButton from "./ColorSchemeButton";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
`;

const ColorPalette = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const ColorPicker = () => {
  return (
    <Container>
      <ColorPalette>
        <ColorSchemeButton cs="dark" />
        <ColorSchemeButton cs="blue" />
        {/* <ColorSchemeButton cs="turquoise" /> */}
        <ColorSchemeButton cs="green" />
        <ColorSchemeButton cs="orange" />
        <ColorSchemeButton cs="pink" />
        <ColorSchemeButton cs="light" />
      </ColorPalette>
    </Container>
  );
};

export default ColorPicker;
