import { View } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import useColors from "@src/hooks/utilityHooks/useColors";

const Container = styled(View)`
  position: relative;
  flex-direction: column;
  padding-horizontal: 3px;
`;

const Fade = styled(LinearGradient)`
  position: absolute;
  ${(props) => props.side}: 0;
  height: 100%;
  width: 30px;
  z-index: 20;
`;

const HorizontalScrollFade = ({ children }) => {
  const { PRIMARY } = useColors();

  return (
    <Container>
      <Fade
        {...{
          side: "left",
          colors: [
            PRIMARY,
            PRIMARY + "E6",
            PRIMARY + "80",
            PRIMARY + "00",
          ],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
      />
      <Fade
        {...{
          side: "right",
          colors: [
            PRIMARY + "00",
            PRIMARY + "80",
            PRIMARY + "E6",
            PRIMARY,
          ],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
      />
      {children}
    </Container>
  );
};

export default HorizontalScrollFade;
