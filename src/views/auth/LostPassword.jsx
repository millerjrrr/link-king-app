import { Keyboard, StyleSheet, View } from "react-native";
import SubmitBtn from "../../components/form/SubmitBtn";
import AppLink from "../../ui/AppLink";
import AuthInputField from "../../components/form/AuthInputField";
import Form from "../../components/form";
import * as yup from "yup";
import AuthFormContainer from "../../components/containers/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import client from "../../api/client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authErrorHandler } from "../../errors/authErrorHandler";
import appTextContent from "../../utils/appTextContent";

const LostPassword = () => {
  const { email } = appTextContent.english.auth.forms;

  const validationSchema = yup.object({
    email: yup
      .string()
      .trim(email.trim)
      .email(email.email)
      .required(email.required),
  });
  const initialValues = {
    email: "",
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

  const navigation = useNavigation();

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    try {
      const { data } = await client.post(
        "/api/users/forgot-password",

        {
          ...values,
        },
        {
          timeout: 3000,
        },
      );
      if (data.status === "success")
        navigation.navigate("CheckYourEmail", {
          key: "passwordReset",
        });
    } catch (error) {
      authErrorHandler(error, dispatch);
    }
    actions.setSubmitting(false);
  };

  const { sendLink, signIn, signUp } =
    appTextContent.english.auth.titles;

  const { heading, subHeading } =
    appTextContent.english.auth.lostPassword;

  return (
    <AuthFormContainer
      {...{
        heading,
        subHeading,
      }}
    >
      <Form
        {...{ onSubmit, initialValues, validationSchema }}
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
          {!isKeyboardShowing ? (
            <>
              <SubmitBtn {...{ title: sendLink }} />
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
                    title: signUp,
                    onPress: () =>
                      navigation.navigate("SignUp"),
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

export default LostPassword;
