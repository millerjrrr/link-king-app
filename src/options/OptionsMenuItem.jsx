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
      {...{ first, iconName, selected, onPress }}
    >
      <MenuItemLink
        {...{ name, onPress, gray: !selected }}
      />
    </OptionsMenuItemContainer>
  );
};

export default OptionsMenuItem;
