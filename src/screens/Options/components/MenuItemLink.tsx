import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AppText from "@src/components/AppText";
import useColors from "@src/hooks/utilityHooks/useColors";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const MenuItemName = styled(AppText)<{
  color: `#${string}`;
}>`
  color: ${(props: { color: `#${string}` }) => props.color};
  font-size: ${base * 20}px;
  text-align: flex-start;
`;

interface MenuItemLinkProps {
  name: string;
  onPress: () => void;
  gray?: boolean;
}

const MenuItemLink: React.FC<MenuItemLinkProps> = ({
  name,
  onPress,
  gray,
}) => {
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
