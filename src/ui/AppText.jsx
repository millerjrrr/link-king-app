import { Text } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getSettingsState } from "../store/settings";
import colors from "../utils/colors";

const TextBlock = styled(Text)`
  color: ${(props) => props.color};
`;
const AppText = ({ style, children }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <TextBlock
      {...{
        style: {
          fontSize: 25,
          textAlign: "center",
          ...style,
        },
        color,
      }}
    >
      {children}
    </TextBlock>
  );
};

export default AppText;
