import { StyleSheet, View } from "react-native";
import SubmitBtn from "@src/components/form/SubmitBtn";
import AppLink from "@src/components/AppLink";
import AuthInputField from "@src/components/form/AuthInputField";
import Form from "@src/components/form";
import * as yup from "yup";
import PasswordVisibilityIcon from "@src/components/PasswordVisibilityIcon";
import AuthFormContainer from "@src/components/containers/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import client from "@src/api/client";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  refreshPage,
  updateEmail,
  updateLoggedInState,
  updateToken,
} from "@src/store/auth";
import { saveToAsyncStorage } from "@src/utils/asyncStorage";
import { useState } from "react";
import { authErrorHandler } from "@src/errors/authErrorHandler";
import { getSettingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";

const SignIn = () => {
  const { appLang } = useSelector(getSettingsState);
  const { email, password } =
    appTextSource(appLang).auth.forms;

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
        "/api/v1/users/log-in",

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
      dispatch(refreshPage());
    } catch (error) {
      authErrorHandler(error, dispatch);
    }
    actions.setSubmitting(false);
  };

  const { heading } = appTextSource(appLang).auth.signIn;
  const { signIn, signUp, lostPassword } =
    appTextSource(appLang).auth.titles;

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
                navigation.navigate("Welcome");
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