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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authErrorHandler } from "../../errors/authErrorHandler";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";

const SignUp = () => {
  const { appLang } = useSelector(getSettingsState);

  const { name, email, password } =
    appTextSource[appLang].auth.forms;

  const validationSchema = yup.object({
    name: yup
      .string()
      .trim(name.trim)
      .min(3, name.min)
      .required(name.required),
    email: yup
      .string()
      .trim(email.trim)
      .email(email.email)
      .required(email.required),
    password: yup
      .string()
      .trim(password.trim)
      .min(8, password.min)
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
        password.matches,
      )
      .required(password.required),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
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

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const onSubmit = async (values, actions) => {
    values.passwordConfirm = values.password;
    values.username = values.name;

    actions.setSubmitting(true);
    try {
      const { data } = await client.post(
        "/api/users/sign-up",
        {
          ...values,
        },
        {
          timeout: 3000,
        },
      );
      if (data.status === "success")
        navigation.navigate("CheckYourEmail", {
          key: "verification",
        });
    } catch (error) {
      authErrorHandler(error, dispatch);
    }
    actions.setSubmitting(false);
  };

  const { heading, subHeading } =
    appTextSource[appLang].auth.signUp;

  const { signIn, signUp, lostPassword } =
    appTextSource[appLang].auth.titles;

  return (
    <AuthFormContainer {...{ heading, subHeading }}>
      <Form
        {...{ onSubmit, initialValues, validationSchema }}
      >
        <View style={styles.formContainer}>
          <AuthInputField
            {...{
              name: "name",
              label: name.label,
              placeholder: name.placeholder,
              containerStyle: styles.marginBottom,
            }}
          />
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
              <SubmitBtn {...{ title: signUp }} />
              <View style={styles.linkContainer}>
                <AppLink
                  {...{
                    title: signIn,
                    onPress: () =>
                      navigation.navigate("SignIn"),
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

export default SignUp;
