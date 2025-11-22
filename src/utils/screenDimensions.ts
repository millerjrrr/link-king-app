import { Dimensions, Platform } from "react-native";

const scale = 812;
const scale2 = 375;

const screenDimensions = () => {
  const { width: vw, height: vh } =
    Dimensions.get("window");

  const { width, height, base } = Platform.select({
    ios: { width: vw, height: vh, base: vh / scale },
    android: { width: vw, height: vh, base: vw / scale2 },
    web:
      vh > 1.5 * vw
        ? {
            width: vw,
            height: vh,
            base: vh / scale,
          }
        : {
            width: Math.min(430, vh * 0.462),
            height: Math.min(930, vh * 0.95),
            base: Math.min(930, vh * 0.95) / scale,
          },
    default: { width: vw, height: vh, base: vh / scale },
  });

  return { width, height, base };
};

export default screenDimensions;
