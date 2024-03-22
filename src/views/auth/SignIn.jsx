import { Keyboard, StyleSheet, View } from "react-native";
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
  updateLoggedInState,
  updateToken,
} from "../../store/auth";
import { saveToAsyncStorage } from "../../utils/asyncStorage";
import { useEffect, useState } from "react";
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
  const initialValues = {
    email: "",
    password: "",
  };

  //Keyboard Management
  const [isKeyboardShowing, setIsKeyboardShowing] =
    useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardShowing(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardShowing(false),
    );

    // Cleanup function to remove listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  ////////////////////////////////////

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
        },
      );
      await saveToAsyncStorage("auth-token", data.token);
      dispatch(updateToken(data.token));
      dispatch(updateLoggedInState(true));
    } catch (error) {
      authErrorHandler(error, dispatch);
    }
    actions.setSubmitting(false);
  };

  const { heading } = appTextSource[appLang].auth.signIn;
  const { signIn, signUp, lostPassword } =
    appTextSource[appLang].auth.titles;

  return (
    <AuthFormContainer {...{ heading }}>
      <Form
        {...{
          onSubmit,
          initialValues,
          validationSchema,
        }}
      >
        <View style={styles.formContainer}>
          <AuthInputField
            {...{
              name: "email",
              label: email.label,
              placeholder: email.placeholder,
              keyboardType: "email-address",
              autoCapitalize: "none",
              containerStyle: styles.marginBottom,
            }}
          />
          <AuthInputField
            {...{
              name: "password",
              label: password.label,
              placeholder: "********",
              autoCapitalize: "none",
              secureTextEntry: secureEntry,
              containerStyle: styles.marginBottom,
              rightIcon: (
                <PasswordVisibilityIcon
                  {...{ privateIcon: secureEntry }}
                />
              ),
              onRightIconPress: togglePasswordView,
            }}
          />
          {!isKeyboardShowing ? (
            <>
              <SubmitBtn title={signIn} />
              <View style={styles.linkContainer}>
                <AppLink
                  title={signUp}
                  onPress={() => {
                    navigation.navigate("SignUp");
                  }}
                />
                <AppLink
                  title={lostPassword}
                  onPress={() => {
                    navigation.navigate("LostPassword");
                  }}
                />
              </View>
            </>
          ) : null}
        </View>
      </Form>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
});

export default SignIn;
