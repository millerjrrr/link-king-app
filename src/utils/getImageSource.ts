import { ImageSourcePropType } from "react-native";

const images = require.context(
  "../../assets/img/flags",
  false,
  /\.png$/,
) as { (key: string): any; keys: () => string[] };

const getImageSource = (
  name: string,
): ImageSourcePropType => {
  try {
    if (name && images(`./${name}.png`)) {
      return images(`./${name}.png`) as ImageSourcePropType;
    } else {
      throw new Error();
    }
  } catch (e) {
    return images(
      `./smallCrown.png`,
    ) as ImageSourcePropType;
  }
};

export default getImageSource;
