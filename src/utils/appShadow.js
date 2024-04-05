import { Platform } from "react-native";

const appShadow = (borderWidth = 2) =>
  Platform.select({
    ios: {
      shadowOffset: {
        height: 1,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    android: {
      borderWidth,
    },
  });

export default appShadow;
