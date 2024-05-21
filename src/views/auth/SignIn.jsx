import { StyleSheet, View } from "react-native";
import SubmitBtn from "../../components/form/SubmitBtn";
import AppLink from "../../ui/AppLink";
import AuthInputField from "../../components/form/AuthInputField";
import Form from "../../components/form";
import * as yup from "yup";
import PasswordVisibilityIcon from "../../ui/PasswordVisibilityIcon";
import AuthFormContainer from "../../components/containers/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import client from "../../api/client";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  updateEmail,
  updateLoggedInState,
  updateToken,
} from "../../store/auth";
import { saveToAsyncStorage } from "../../utils/asyncStorage";
import { useState } from "react";
import { authErrorHandler } from "../../errors/authErrorHandler";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";

const SignIn = () => {
  const { appLang } = useSelector(getSettingsState);
  const { email, password } =
    appTextSource[appLang].auth.forms;

  const validationSchema = yup.object({
    email: yup
      .string()
      .trim(email.trim)
      .email(email.email)
      .required(email.required),
    password: yup
      .string()
      .trim(password.trim)
      .required(password.required),
  });
  const { formEmail } = useSelector(getAuthState);

  const initialValues = {
    email: formEmail,
    password: "",
  };

  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    try {
      const { data } = await client.post(
        "/api/users/log-in",

        {
          ...values,
        },
        {
          timeout: 3000,
          headers: {
            "Accept-Language": appLang,
          },
        },
      );
      await saveToAsyncStorage("auth-token", data.token);
      dispatch(updateToken(data.token));
      dispatch(updateLoggedInState(true));
      dispatch(updateEmail(""));
    } catch (error) {
      authErrorHandler(error, dispatch);
    }
    actions.setSubmitting(false);
  };

  const { heading } = appTextSource[appLang].auth.signIn;
  const { signIn, signUp, lostPassword } =
    appTextSource[appLang].auth.titles;

  return (
    <AuthFormContainer {...{ heading, back: false }}>
      <Form
        {...{
          onSubmit,
          initialValues,
          validationSchema,
        }}
      >
        <>
          <AuthInputField
            {...{
              name: "email",
              label: email.label,
              placeholder: email.placeholder,
              keyboardType: "email-address",
              autoCapitalize: "none",
              containerStyle: { marginBottom: 20 },
            }}
          />
          <AuthInputField
            {...{
              name: "password",
              label: password.label,
              placeholder: "********",
              autoCapitalize: "none",
              secureTextEntry: secureEntry,
              rightIcon: (
                <PasswordVisibilityIcon
                  {...{ privateIcon: secureEntry }}
                />
              ),
              onRightIconPress: togglePasswordView,
            }}
          />

          <View style={styles.linkContainer}>
            <AppLink
              title={signUp}
              onPress={() => {
                navigation.navigate("Welcome", {
                  key: "start",
                });
              }}
            />
            <AppLink
              title={lostPassword}
              onPress={() => {
                navigation.navigate("LostPassword");
              }}
            />
          </View>
          <SubmitBtn title={signIn} />
        </>
      </Form>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});

export default SignIn;
