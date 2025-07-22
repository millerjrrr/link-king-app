import React from "react";
import OptionsMenuItemContainer from "./OptionsMenuItemContainer";
import MenuItemLink from "./MenuItemLink";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Dictionary from "../../../types/dictionaries";

// Define the prop types interface
interface OptionsMenuItemProps {
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  dictionary: Dictionary;
  first?: boolean;
  name: string;
  onPress: () => void;
  selected?: boolean;
}

const OptionsMenuItem: React.FC<OptionsMenuItemProps> = (
  props,
) => {
  const { name, onPress, selected, ...containerProps } =
    props;

  return (
    <OptionsMenuItemContainer
      {...containerProps}
      onPress={onPress}
    >
      <MenuItemLink
        name={name}
        onPress={onPress}
        gray={!selected}
      />
    </OptionsMenuItemContainer>
  );
};

export default OptionsMenuItem;
