import { View, StyleSheet } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import { settingsState } from "@src/store/settings";
import styled from "styled-components/native";
import AppText from "../../../components/AppText";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface Props {
  color: `#${string}`;
  size: number;
  opacity: number;
}
const TailEntryText = styled(AppText)<Props>`
  color: ${(props: Props) => props.color};
  font-size: ${(props: Props) => props.size}px;
  opacity: ${(props: Props) => props.opacity};
  text-align: center;
`;

const TailEntry: React.FC<{ index: number }> = ({
  index,
}) => {
  const {
    display: { tail },
  } = useSelector(selectConsoleState);
  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  //font-size management
  let size = (4 - index) * 7 + 12;
  const length = tail[index] ? tail[index].length : 0;
  if (length > 12) size = (size * 12) / length;

  const opacity = 1 / (index + 1) / 2;

  return tail[index] ? (
    <TailEntryText
      color={color}
      size={size}
      opacity={opacity}
    >
      {tail[index]}
    </TailEntryText>
  ) : null;
};

const Tail = () => {
  return (
    <View style={styles.container}>
      <>
        <TailEntry index={0} />
        <TailEntry index={1} />
        <TailEntry index={2} />
        <TailEntry index={3} />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    zIndex: 5,
    overflow: "hidden",
  },
});

export default Tail;
