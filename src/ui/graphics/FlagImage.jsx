import { Image, View } from "react-native";
import getImageSource from "../../utils/getImageSource";

const FlagImage = ({ flag1, flag2, scale = 0.75 }) => {
  const source = [
    getImageSource(flag1),
    getImageSource(flag2),
  ];

  return (
    <View
      {...{
        style: {
          width: 54 * scale,
          height: 36 * scale,
          margin: 5,
        },
      }}
    >
      <Image
        {...{
          source: source[0],
          resizeMode: "contain",
          style: {
            width: 36 * scale,
            height: 36 * scale,
            position: "absolute",
            top: 0,
            left: 0,
          },
        }}
      />
      <Image
        {...{
          source: source[1],
          resizeMode: "contain",
          style: {
            width: 36 * scale,
            height: 36 * scale,
            position: "absolute",
            top: 0,
            left: 18 * scale,
          },
        }}
      />
    </View>
  );
};

export default FlagImage;