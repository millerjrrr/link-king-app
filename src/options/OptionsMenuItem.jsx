import OptionsMenuItemContainer from "./components/OptionsMenuItemContainer";
import MenuItemLink from "./components/MenuItemLink";

const OptionsMenuItem = ({
  iconName,
  dictionary,
  first,
  name,
  onPress,
  selected,
}) => {
  return (
    <OptionsMenuItemContainer
      {...{
        iconName,
        dictionary,
        first,
        selected,
        onPress,
      }}
    >
      <MenuItemLink
        {...{ name, onPress, gray: !selected }}
      />
    </OptionsMenuItemContainer>
  );
};

export default OptionsMenuItem;
