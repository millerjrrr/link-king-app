import { Platform, View } from "react-native";
import AppleAuthButton from "./AppleAuthButton";
import GoogleAuthButton from "./GoogleAuthButton";

const Auth3PButtons = () => {
  const showApple = Platform.OS === "ios";
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {showApple ? <AppleAuthButton /> : null}
      <GoogleAuthButton />
    </View>
  );
};

export default Auth3PButtons;
