import OptionsMenuItemContainer from "./components/OptionsMenuItemContainer";
import MenuItemLink from "./components/MenuItemLink";

const OptionsMenuItem = ({
  iconName,
  first,
  name,
  onPress,
}) => {
  return (
    <OptionsMenuItemContainer {...{ first, iconName }}>
      <MenuItemLink {...{ name, onPress }} />
    </OptionsMenuItemContainer>
  );
};

export default OptionsMenuItem;
