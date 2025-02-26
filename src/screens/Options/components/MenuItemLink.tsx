import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AppText from "@src/components/AppText";
import useColors from "@src/hooks/utilityHooks/useColors";

const MenuItemName = styled(AppText)<{
  color: string;
}>`
  color: ${(props) => props.color};
  font-size: 20px;
  text-align: flex-start;
`;

const MenuItemLink = ({ name, onPress, gray }: any) => {
  const { INACTIVE_CONTRAST, CONTRAST } = useColors();
  const color = gray ? INACTIVE_CONTRAST : CONTRAST;

  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        width: "100%",
      }}
      onPress={onPress}
    >
      <MenuItemName color={color}>{name}</MenuItemName>
    </TouchableOpacity>
  );
};

export default MenuItemLink;
