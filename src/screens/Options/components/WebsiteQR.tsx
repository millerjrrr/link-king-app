import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { Image } from "react-native";
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
      style={{
        flex: 1,
        aspectRatio: 1,
        borderRadius: 15,
        margin: 25,
      }}
    />
  );
};

export default WebsiteQR;
