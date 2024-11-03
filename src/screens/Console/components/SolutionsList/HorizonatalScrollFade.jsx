import { View } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getSettingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { LinearGradient } from "expo-linear-gradient";

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
  const { colorScheme } = useSelector(getSettingsState);
  const backgroundColor = colors[colorScheme].PRIMARY;

  return (
    <Container>
      <Fade
        {...{
          side: "left",
          colors: [
            backgroundColor,
            backgroundColor + "E6",
            backgroundColor + "80",
            backgroundColor + "00",
          ],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
      />
      <Fade
        {...{
          side: "right",
          colors: [
            backgroundColor + "00",
            backgroundColor + "80",
            backgroundColor + "E6",
            backgroundColor,
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
