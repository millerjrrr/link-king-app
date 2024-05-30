import { useSelector } from "react-redux";
import AppLink from "./AppLink";
import { getSettingsState } from "../store/settings";
import appTextSource from "../utils/appTextSource";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUpAppLink = ({}) => {
  const navigation = useNavigation();
  onPress = () => {
    navigation.navigate("SignIn");
  };

  const { appLang } = useSelector(getSettingsState);
  const { goToSignIn: title } =
    appTextSource[appLang].auth.titles;

  return (
    <View
      style={{
        marginTop: 10,
        width: "100%",
        alignItems: "center",
      }}
    >
      <AppLink {...{ title, onPress }} />
    </View>
  );
};

export default SignUpAppLink;
