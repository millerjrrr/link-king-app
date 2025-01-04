import useColors from "@src/hooks/useColors";
import { Image } from "react-native";
declare function require(path: string): any;

const WebsiteQR = () => {
  const tintColor = useColors().CONTRAST;
  return (
    <Image
      source={require("@assets/img/websiteQR.png")}
      tintColor={tintColor}
      resizeMode="contain"
      style={{
        flex: 1,
        margin: 10,
      }}
    />
  );
};

export default WebsiteQR;
