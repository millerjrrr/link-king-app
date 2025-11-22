import { Image } from "react-native";
import LinkKingLogoImage from "@assets/img/link-king-header-logo-flair.png";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface LinkKingLogoProps {
  height?: number;
  marginTop?: number;
  tintColor: `#${string}`;
}

const LinkKingLogo: React.FC<LinkKingLogoProps> = ({
  height = base * 100,
  marginTop = base * 20,
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
