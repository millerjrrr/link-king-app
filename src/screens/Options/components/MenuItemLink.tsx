import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import AppText from "@src/components/AppText";

const MenuItemName = styled(AppText)<{
  color: string;
}>`
  color: ${(props) => props.color};
  font-size: 20px;
  text-align: flex-start;
`;

const MenuItemLink = ({ name, onPress, gray }: any) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
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
