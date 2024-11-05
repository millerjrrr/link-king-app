import { Image } from "react-native";
import { useSelector } from "react-redux";
import colors from "@src/utils/colors";
import { settingsState } from "@src/store/settings";

const LinkKingIcon = () => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const tintColor = colors[colorScheme].CONTRAST[golden];
  return (
    <Image
      {...{
        source: require("@assets/img/link-king-header-logo.png"),
        resizeMode: "contain",
        tintColor,
        style: {
          height: 100,
        },
      }}
    />
  );
};

export default LinkKingIcon;
