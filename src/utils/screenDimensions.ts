import { Dimensions, Platform } from "react-native";

const screenDimensions = () => {
  const { width: vw, height: vh } =
    Dimensions.get("window");

  const { width, height } = Platform.select({
    ios: { width: vw, height: vh },
    android: { width: vw, height: vh },
    web: {
      width: Math.min(430, vh * 0.462),
      height: Math.min(930, vh * 0.95),
    },
    default: { width: vw, height: vh },
  });

  return { width, height };
};

export default screenDimensions;
