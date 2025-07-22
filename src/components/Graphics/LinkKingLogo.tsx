import { Image } from "react-native";
import LinkKingLogoImage from "@assets/img/link-king-header-logo-flair.png";

interface LinkKingLogoProps {
  height?: number;
  marginTop?: number;
  tintColor: `#${string}`;
}

const LinkKingLogo: React.FC<LinkKingLogoProps> = ({
  height = 100,
  marginTop = 20,
  tintColor,
}) => {
  return (
    <Image
      source={LinkKingLogoImage}
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
