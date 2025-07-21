import {
  Entypo,
  MaterialIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

export type EntypoIcons = keyof typeof Entypo.glyphMap;
export type MaterialIconsIcons =
  keyof typeof MaterialIcons.glyphMap;
export type FontAwesomeIcons =
  keyof typeof FontAwesome.glyphMap;
export type AntDesignIcons =
  keyof typeof AntDesign.glyphMap;

export type IconName =
  | EntypoIcons
  | MaterialIconsIcons
  | FontAwesomeIcons;

export type IconLibrary =
  | "Entypo"
  | "MaterialIcons"
  | "FontAwesome";

export type IconNameMap = {
  Entypo: EntypoIcons;
  MaterialIcons: MaterialIconsIcons;
  FontAwesome: FontAwesomeIcons;
};
