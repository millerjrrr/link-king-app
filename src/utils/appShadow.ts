import { Platform, ViewStyle } from "react-native";

const appShadow = (
  color: string,
  width: number = 5,
): ViewStyle =>
  Platform.select({
    ios: {
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: width * 0.6,
      shadowColor: color,
    },
    android: {
      borderWidth: 2,
      borderColor: color + "22",
    },
    web: {
      boxShadow: `0px 0px ${width}px ${color}80`,
    },
    default: {},
  }) || {};

export const appShadowForStyledComponents = (
  color: string,
  width: number = 5,
) =>
  Platform.select({
    ios: `
        shadow-offset: 1px 1px;
        shadow-opacity: 0.5;
        shadow-radius: ${width * 0.6}px;
        shadow-color:${color};
      `,
    android: `
        border-width: 2px;
        border-color:${color + "22"};
      `,
    web: `
        box-shadow: 0px 0px ${width}px ${color}80; 
      `,
    default: "",
  }) || "";

export default appShadow;
