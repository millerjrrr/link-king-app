import { StyleSheet } from "react-native";
import AuthFormContainer from "../../../components/containers/AuthFormContainer";
import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import AuthButton from "../../../components/Buttons/AuthButton";
import { Fontisto } from "@expo/vector-icons";
import AppText from "../../../components/AppText";

const CheckYourEmail = ({ navigation }) => {
  const { appLang } = useSelector(getSettingsState);
  const { heading, subHeading, text, returnToLogin } =
    appTextSource(appLang).auth.passwordReset;

  const onPress = () => navigation.navigate("SignIn");

  return (
    <AuthFormContainer {...{ heading, subHeading }}>
      <Fontisto
        {...{
          name: "email",
          size: 100,
          color: "white",
        }}
      />
      <AppText style={styles.text}>{text}</AppText>
      <AuthButton
        {...{
          title: returnToLogin,
          busy: false,
          onPress,
        }}
      />
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 15,
    marginBottom: 40,
  },
});

export default CheckYourEmail;
