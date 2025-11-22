import { View } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import useColors from "@src/hooks/utilityHooks/useColors";
import { ReactNode } from "react";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const Container = styled(View)`
  position: relative;
  flex-direction: column;
  padding-horizontal: 3px;
`;

const Fade = styled(LinearGradient)<{
  side: "left" | "right";
}>`
  position: absolute;
  ${(props: { side: "left" | "right" }) => props.side}: 0;
  height: 100%;
  width: ${base * 30}px;
  z-index: 20;
`;

const HorizontalScrollFade: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
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
