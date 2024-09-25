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

export default appShadow;
