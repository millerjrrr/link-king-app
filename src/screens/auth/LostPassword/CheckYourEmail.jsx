import { StyleSheet } from "react-native";
import AuthFormContainer from "@components/Containers/AuthFormContainer";
import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AuthButton from "@components/Buttons/AuthButton";
import { Fontisto } from "@expo/vector-icons";
import AppText from "@components/AppText";
import colors from "@src/utils/colors";

const CheckYourEmail = ({ navigation }) => {
  const { appLang } = useSelector(settingsState);
  const { heading, subHeading, text, returnToLogin } =
    appTextSource(appLang).auth.passwordReset;

  return (
    <AuthFormContainer
      heading={heading}
      subHeading={subHeading}
    >
      <Fontisto
        name="email"
        size={100}
        color={colors.dark.CONTRAST[0]}
      />
      <AppText style={styles.text}>{text}</AppText>
      <AuthButton
        title={returnToLogin}
        busy={false}
        onPress={() => navigation.navigate("Sign In")}
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
