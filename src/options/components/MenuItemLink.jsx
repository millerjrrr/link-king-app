import { Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getSettingsState } from "../../store/settings";
import colors from "../../utils/colors";

const MenuItemName = styled(Text)`
  color: ${(props) => props.color};
  font-size: 20px;
`;

const MenuItemLink = ({ name, onPress }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <TouchableOpacity
      {...{
        style: {
          flex: 1,
          justifyContent: "center",
          width: "100%",
        },
        onPress,
      }}
    >
      <MenuItemName {...{ color }}>{name}</MenuItemName>
    </TouchableOpacity>
  );
};

export default MenuItemLink;
