import { Image } from "react-native";
import { useSelector } from "react-redux";
import colors from "@src/utils/colors";
import { settingsState } from "@src/store/settings";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();
import Logo from "@assets/img/link-king-header-logo-flair.png";

const LinkKingIcon = () => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const tintColor = colors[colorScheme].CONTRAST[golden];
  return (
    <Image
      source={Logo}
      resizeMode="contain"
      tintColor={tintColor}
      style={{
        height: base * 100,
      }}
    />
  );
};

export default LinkKingIcon;
