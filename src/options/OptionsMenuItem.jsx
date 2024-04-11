import OptionsMenuItemContainer from "./components/OptionsMenuItemContainer";
import MenuItemLink from "./components/MenuItemLink";

const OptionsMenuItem = ({
  iconName,
  first,
  name,
  onPress,
  selected,
}) => {
  return (
    <OptionsMenuItemContainer
      {...{ first, iconName, selected }}
    >
      <MenuItemLink {...{ name, onPress }} />
    </OptionsMenuItemContainer>
  );
};

export default OptionsMenuItem;
