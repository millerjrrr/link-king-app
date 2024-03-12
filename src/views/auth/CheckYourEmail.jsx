import { StyleSheet, Text } from "react-native";
import colors from "../../utils/colors";
import AuthFormContainer from "../../components/containers/AuthFormContainer";
import AppButton from "../../ui/AppButton";
import Panel from "../../ui/Panel";

const CheckYourEmail = ({
  navigation,
  size = 200,
  route,
}) => {
  const { heading, subHeading, text } = route.params;

  const onPress = () => navigation.navigate("SignIn");

  return (
    <AuthFormContainer {...{ heading, subHeading }}>
      <Panel {...{ shadowColor: color }}>
        <Text style={styles.text}>{text}</Text>
        <AppButton
          {...{
            name: "login",
            size,
            busy: false,
            onPress,
          }}
        />
      </Panel>
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
