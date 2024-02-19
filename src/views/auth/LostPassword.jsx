import { Keyboard, StyleSheet, View } from "react-native";
import SubmitBtn from "../../components/form/SubmitBtn";
import AppLink from "../../ui/AppLink";
import AuthInputField from "../../components/form/AuthInputField";
import Form from "../../components/form/index";
import * as yup from "yup";
import AuthFormContainer from "../../components/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import client from "../../api/client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../store/notification";
import catchAsyncError from "../../api/catchError";

const signUpSchema = yup.object({
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

  const handleSubmit = async (values, actions) => {
    console.log({ ...values });

    //to add loading without the formik context, video
    // 228. Loading Indicator explains it well
    actions.setSubmitting(true);
    try {
      const res = await client.post(
        "/api/v1/users/forgotPassword",

        {
          ...values,
        },
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(
        updateNotification({
          message: errorMessage,
          type: "error",
        }),
      );
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
        onSubmit={handleSubmit}
        initialValues={initialValues}
        signUpSchema={signUpSchema}
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
