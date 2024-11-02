import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getSettingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import AppText from "../../components/AppText";

const MenuItemName = styled(AppText)`
  color: ${(props) => props.color};
  font-size: 20px;
  text-align: flex-start;
`;

const MenuItemLink = ({ name, onPress, gray }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = gray
    ? colors[colorScheme].INACTIVE_CONTRAST
    : colors[colorScheme].CONTRAST[golden];

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
