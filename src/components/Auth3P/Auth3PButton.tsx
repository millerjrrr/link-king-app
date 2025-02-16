import useColors from "@src/hooks/useColors";
import appShadow from "@src/utils/appShadow";
import { Image, TouchableOpacity } from "react-native";
import AppText from "../AppText";

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
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        ...appShadow(CONTRAST),
        marginVertical: 10,
        width: 250,
        height: 50,
      }}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={images[name]}
        style={{
          width: 24,
          height: 24,
          marginRight: 10,
        }}
      />
      <AppText
        style={{
          fontSize: 16,
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
