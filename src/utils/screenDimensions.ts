import { Dimensions, Platform } from "react-native";

const scale = 930;
const scale2 = 500;

const screenDimensions = () => {
  const { width: vw, height: vh } =
    Dimensions.get("window");

  const { width, height, base } = Platform.select({
    ios: { width: vw, height: vh, base: vh / scale },
    android: { width: vw, height: vh, base: vw / scale2 },
    web: {
      width: Math.min(430, vh * 0.462),
      height: Math.min(930, vh * 0.95),
      base: Math.min(930, vh * 0.95) / scale,
    },
    default: { width: vw, height: vh, base: vh / scale },
  });

  return { width, height, base };
};

export default screenDimensions;
