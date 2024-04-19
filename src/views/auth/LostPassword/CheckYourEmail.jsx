import { StyleSheet, Text } from "react-native";
import colors from "../../../utils/colors";
import AuthFormContainer from "../../../components/containers/AuthFormContainer";
import appTextSource from "../../../utils/appTextSource";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../../store/settings";
import AuthButton from "../../../ui/AuthButton";
import { Fontisto } from "@expo/vector-icons";

const CheckYourEmail = ({ navigation }) => {
  const { appLang } = useSelector(getSettingsState);
  const { heading, subHeading, text, returnToLogin } =
    appTextSource[appLang].auth.passwordReset;

  const onPress = () => navigation.navigate("SignIn");

  return (
    <AuthFormContainer {...{ heading, subHeading }}>
      <Fontisto
        {...{
          name: "email",
          size: 100,
          color: colors.dark.CONTRAST[0],
        }}
      />
      <Text style={styles.text}>{text}</Text>
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
    color: colors.dark.CONTRAST[0],
    fontSize: 25,
    textAlign: "center",
  },
});

export default CheckYourEmail;
