import { Image } from "react-native";

const LinkKingLogo = ({
  height = 100,
  marginTop = 20,
  tintColor,
}) => {
  return (
    <Image
      source={require("@assets/img/link-king-header-logo.png")}
      resizeMode="contain"
      tintColor={tintColor}
      style={{
        marginTop,
        height,
        transform: [{ translateY: height * 0.15 }],
      }}
    />
  );
};

export default LinkKingLogo;
