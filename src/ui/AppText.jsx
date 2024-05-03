import { Text } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getSettingsState } from "../store/settings";
import colors from "../utils/colors";

const TextBlock = styled(Text)`
  font-size: ${(props) => props.size}px;
  color: ${(props) => props.color};
  text-align: center;
  padding: ${(props) => props.padding}px;
  font-weight: ${(props) => props.weight};
`;
const AppText = ({
  size = 30,
  children,
  weight = "normal",
  padding = 0,
}) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <TextBlock {...{ size, color, weight, padding }}>
      {children}
    </TextBlock>
  );
};

export default AppText;
