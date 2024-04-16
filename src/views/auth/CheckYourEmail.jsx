import { StyleSheet, Text } from "react-native";
import colors from "../../utils/colors";
import AuthFormContainer from "../../components/containers/AuthFormContainer";
import AppButton from "../../ui/AppButton";
import Panel from "../../ui/Panel";
import appTextSource from "../../utils/appTextSource";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";

const CheckYourEmail = ({
  navigation,
  size = 200,
  route,
}) => {
  const { key } = route.params;
  const { appLang, colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const { heading, subHeading, text } =
    appTextSource[appLang].auth[key];
  const color = colors[colorScheme].CONTRAST[golden];

  const onPress = () => navigation.navigate("SignIn");

  return (
    <AuthFormContainer {...{ heading, subHeading }}>
      <Panel {...{ shadowColor: color, black: true }}>
        <Text style={styles.text}>{text}</Text>
      </Panel>
      <AppButton
        {...{
          name: "login",
          size,
          busy: false,
          onPress,
        }}
      />
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.dark.CONTRAST[0],
    fontSize: 30,
    textAlign: "center",
  },
});

export default CheckYourEmail;
