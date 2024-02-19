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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../store/notification";
import catchAsyncError from "../../api/catchError";

const signUpSchema = yup.object({
  name: yup
    .string()
    .trim("Name is missing!")
    .min(3, "Name is too short!")
    .required("Name is required!"),
  email: yup
    .string()
    .trim("Email is missing!")
    .email("Invalid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .trim("Password is missing!")
    .min(8, "Password is too short!")
    // .matches(
    //   /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
    //   "Password is too simple!",
    // )
    .required("Password is required!"),
});
const initialValues = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
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

  const handleSubmit = async (values, actions) => {
    values.passwordConfirm = values.password;
    values.username = values.name;

    actions.setSubmitting(true);
    try {
      const { data } = await client.post(
        "/api/v1/users/signup",
        {
          ...values,
        },
        {
          timeout: 3000,
        },
      );
      if (data.status === "success")
        navigation.navigate("CheckYourEmail");
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
      heading="Welcome!"
      subHeading="Let's get started by creating your account."
    >
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        signUpSchema={signUpSchema}
      >
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            label="Name"
            placeholder="Your Name"
            containerStyle={styles.marginBottom}
          />
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
              <SubmitBtn title="Sign Up" />
              <View style={styles.linkContainer}>
                <AppLink
                  title="Sign in"
                  onPress={() => {
                    navigation.navigate("SignIn");
                  }}
                />
                <AppLink
                  title="I lost my password"
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

export default SignUp;
