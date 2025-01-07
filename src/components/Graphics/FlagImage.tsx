import { Image, View } from "react-native";
import getImageSource from "@src/utils/getImageSource";
import React from "react";
import appShadow from "@src/utils/appShadow";
import useColors from "@src/hooks/useColors";

interface FlagImageProps {
  flag1: string;
  flag2?: string;
  scale?: number;
}
const FlagImage: React.FC<FlagImageProps> = ({
  flag1,
  flag2,
  scale = 0.75,
}) => {
  const source1 = getImageSource(flag1);
  const source2 = flag2 ? getImageSource(flag2) : source1;

  const { CONTRAST, PRIMARY } = useColors();

  return (
    <View
      style={{
        width: 36 * scale + (flag2 ? 18 * scale : 0),
        height: 36 * scale,
        margin: 5,
        borderRadius: 18 * scale,
        backgroundColor: PRIMARY,
        ...appShadow(CONTRAST, 5),
      }}
    >
      <Image
        source={source1}
        resizeMode={"contain"}
        style={{
          width: 36 * scale,
          height: 36 * scale,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      {flag2 ? (
        <Image
          source={source2}
          resizeMode={"contain"}
          style={{
            width: 36 * scale,
            height: 36 * scale,
            position: "absolute",
            top: 0,
            left: 18 * scale,
          }}
        />
      ) : null}
    </View>
  );
};

export default FlagImage;
