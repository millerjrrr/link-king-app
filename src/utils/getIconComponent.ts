import {
  Entypo,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

import { IconLibrary } from "@src/types/iconLibrary";

export const getIconComponent = (iconLib: IconLibrary) => {
  switch (iconLib) {
    case "Entypo":
      return Entypo;
    case "MaterialIcons":
      return MaterialIcons;
    case "FontAwesome":
      return FontAwesome;
    default:
      return Entypo;
  }
};
