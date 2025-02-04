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
        height: 250,
        width: 250,
        marginBottom: 20,
      }}
    />
  );
};

export default WebsiteQR;
