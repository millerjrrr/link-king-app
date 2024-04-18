import { StyleSheet, View } from "react-native";
import AppLink from "../../../ui/AppLink";
import AuthFormContainer from "../../../components/containers/AuthFormContainer";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../../store/settings";
import appTextSource from "../../../utils/appTextSource";
import AuthButton from "../../../ui/AuthButton";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const { appLang } = useSelector(getSettingsState);

  const navigation = useNavigation();

  const onPress = async () => {
    navigation.navigate("Name");
  };

  const { signIn, lostPassword } =
    appTextSource[appLang].auth.titles;
  const { heading, subHeading } =
    appTextSource[appLang].auth.signUp.welcome;
  const { next } = appTextSource[appLang].auth.titles;

  return (
    <AuthFormContainer {...{ heading, subHeading }}>
      <AuthButton
        {...{ title: next, busy: false, onPress }}
      />
      <View style={styles.linkContainer}>
        <AppLink
          {...{
            title: signIn,
            onPress: () => navigation.navigate("SignIn"),
          }}
        />
        <AppLink
          {...{
            title: lostPassword,
            onPress: () =>
              navigation.navigate("LostPassword"),
          }}
        />
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Welcome;
