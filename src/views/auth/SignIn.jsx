import { Keyboard, StyleSheet, View } from "react-native";
import SubmitBtn from "../../components/form/SubmitBtn";
import AppLink from "../../ui/AppLink";
import AuthInputField from "../../components/form/AuthInputField";
import Form from "../../components/form/index";
import * as yup from "yup";
import PasswordVisibilityIcon from "../../ui/PasswordVisibilityIcon";
import AuthFormContainer from "../../components/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import client from "../../api/client";
import { useDispatch } from "react-redux";
import {
  updateLoggedInState,
  updateToken,
} from "../../store/auth";
import { saveToAsyncStorage } from "../../utils/asyncStorage";
import { useEffect, useState } from "react";
import { authErrorHandler } from "../../errors/authErrorHandler";

const signUpSchema = yup.object({
  email: yup
    .string()
    .trim("Email is missing!")
    .email("Invalid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .trim("Password is missing!")
    .required("Password is required!"),
});
const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
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

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    try {
      const { data } = await client.post(
        "/api/v1/users/login",

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

  return (
    <AuthFormContainer heading="Welcome back!">
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
          <AuthInputField
            name="password"
            label="Password"
            placeholder="********"
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            containerStyle={styles.marginBottom}
            rightIcon={
              <PasswordVisibilityIcon
                privateIcon={secureEntry}
              />
            }
            onRightIconPress={togglePasswordView}
          />
          {!isKeyboardShowing ? (
            <>
              <SubmitBtn title={"Sign In"} />
              <View style={styles.linkContainer}>
                <AppLink
                  title="I lost my password"
                  onPress={() => {
                    navigation.navigate("LostPassword");
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

export default SignIn;
