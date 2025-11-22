import useColors from "@src/hooks/utilityHooks/useColors";
import appShadow from "@src/utils/appShadow";
import { Image, TouchableOpacity } from "react-native";
import AppText from "../AppText";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface Auth3PButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  name: "google" | "apple";
  color: string;
  textColor: string;
}

declare function require(path: string): any;

const Auth3PButton: React.FC<Auth3PButtonProps> = ({
  onPress,
  title,
  disabled,
  name,
  color,
  textColor,
}) => {
  const { CONTRAST } = useColors();

  const images = {
    google: require("@assets/img/google-icon.png"),
    apple: require("@assets/img/google-icon.png"),
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color,
        paddingVertical: base * 12,
        paddingHorizontal: base * 16,
        borderRadius: base * 10,
        ...appShadow(CONTRAST),
        marginVertical: base * 10,
        width: base * 250,
        height: base * 50,
      }}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={images[name]}
        style={{
          width: base * 24,
          height: base * 24,
          marginRight: base * 10,
        }}
      />
      <AppText
        style={{
          fontSize: base * 16,
          fontWeight: "bold",
          color: textColor,
        }}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default Auth3PButton;
