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

const validationSchema = yup.object({
  email: yup
    .string()
    .trim("Email is missing!")
    .email("Invalid email!")
    .required("Email is required!"),
});
const initialValues = {
  email: "",
};

const LostPassword = () => {
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
          heading: "Password Reset Email Sent",
          subHeading:
            "Use link in email to reset your password",
          text:
            "We've sent you an link which you can use to reset your password " +
            "through our site!",
        });
    } catch (error) {
      authErrorHandler(error, dispatch);
    }
    actions.setSubmitting(false);
  };

  return (
    <AuthFormContainer
      heading="Forgot password"
      subHeading={
        "Oops, did you forget your password? Don't worry, we'll help you get back in."
      }
    >
      <Form
        {...{ onSubmit, initialValues, validationSchema }}
      >
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />
          {!isKeyboardShowing ? (
            <>
              <SubmitBtn title="Send link" />
              <View style={styles.linkContainer}>
                <AppLink
                  title="Sign in"
                  onPress={() => {
                    navigation.navigate("SignIn");
                  }}
                />
                <AppLink
                  title="Sign up"
                  onPress={() => {
                    navigation.navigate("SignUp");
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
