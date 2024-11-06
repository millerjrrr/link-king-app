import { Platform } from "react-native";

const appShadow = () =>
  Platform.select({
    ios: {
      shadowOffset: {
        height: 1,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    android: {
      elevation: 5,
    },
  });

export const appShadowForStyledComponents = () =>
  Platform.select({
    ios: `
      shadow-offset: 1px 1px;
      shadow-opacity: 0.5;
      shadow-radius: 3px;
    `,
    android: `
      elevation: 5;
    `,
  });

export default appShadow;
