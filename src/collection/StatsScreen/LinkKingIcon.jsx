import { Image } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";

const LinkKingIcon = () => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const tintColor = colors[colorScheme].CONTRAST[golden];
  return (
    <Image
      {...{
        source: require("../../assets/link-king-header-logo.png"),
        resizeMode: "contain",
        tintColor,
        style: {
          height: 60,
        },
      }}
    />
  );
};

export default LinkKingIcon;
