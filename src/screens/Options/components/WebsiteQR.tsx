import useColors from "@src/hooks/utilityHooks/useColors";
import { Image } from "react-native";
declare function require(path: string): any;
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const WebsiteQR = () => {
  const tintColor = useColors().CONTRAST;
  return (
    <Image
      source={require("@assets/img/websiteQR.png")}
      tintColor={tintColor}
      resizeMode="contain"
      style={{
        height: base * 250,
        width: base * 250,
        marginBottom: base * 20,
      }}
    />
  );
};

export default WebsiteQR;
