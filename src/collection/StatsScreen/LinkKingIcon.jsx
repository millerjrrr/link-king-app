import { Image } from "react-native";
import { getConsoleState } from "../../store/console";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";

const LinkKingIcon = () => {
  const { golden } = useSelector(getConsoleState);
  return (
    <Image
      source={require("../../assets/link-king-header-logo.png")}
      resizeMode="contain"
      tintColor={colors.CONTRAST[golden]}
      style={{
        height: 60,
      }}
    />
  );
};

export default LinkKingIcon;
