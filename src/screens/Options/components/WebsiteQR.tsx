import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
declare function require(path: string): any;

const WebsiteQR = () => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const tintColor = colors[colorScheme].CONTRAST[golden];
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
