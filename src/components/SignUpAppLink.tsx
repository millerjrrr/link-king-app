import { useSelector } from "react-redux";
import AppLink from "./AppLink";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@src/types/navigationTypes";

const SignUpAppLink = ({}) => {
  const navigation =
    useNavigation<
      StackNavigationProp<AuthStackParamList>
    >();

  const onPress = () => {
    navigation.navigate("Sign In");
  };

  const { appLang } = useSelector(settingsState);
  const { goToSignIn: title } =
    appTextSource(appLang).auth.titles;

  return (
    <View
      style={{
        marginTop: 10,
        width: "100%",
        alignItems: "center",
      }}
    >
      <AppLink title={title} onPress={onPress} />
    </View>
  );
};

export default SignUpAppLink;
