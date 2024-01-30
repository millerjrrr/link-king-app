import { StyleSheet, View } from "react-native";
import SubmitBtn from "../../components/form/SubmitBtn";
import AppLink from "../../ui/AppLink";
import AuthInputField from "../../components/form/AuthInputField";
import Form from "../../components/form/index";
import * as yup from "yup";
import PasswordVisibilityIcon from "../../ui/PasswordVisibilityIcon";
import { useState } from "react";
import AuthFormContainer from "../../components/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import client from "../../api/client";
import { useDispatch } from "react-redux";
import {
  updateLoggedInState,
  updateUser,
  updateToken,
} from "../../store/auth";
import { saveToAsyncStorage } from "../../utils/asyncStorage";

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

const SignIn = (props) => {
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const handleSubmit = async (values, actions) => {
    console.log({ ...values });

    //to add loading without the formik context, video
    // 228. Loading Indicator explains it well
    actions.setSubmitting(true);
    try {
      const { data } = await client.post(
        "/api/v1/users/login",

        {
          ...values,
        },
      );
      // console.log(data);
      // console.log(data.data);
      // console.log(data.token);

      await saveToAsyncStorage("auth-token", data.token);
      dispatch(updateUser(data.data.user));
      dispatch(updateToken(data.token));
      dispatch(updateLoggedInState(true));
    } catch (error) {
      console.log("Sign in error", error);
    }
    actions.setSubmitting(false);
  };
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      signUpSchema={signUpSchema}
    >
      <AuthFormContainer heading="Welcome back!">
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
          <SubmitBtn title="Sign in" />
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
        </View>
      </AuthFormContainer>
    </Form>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default SignIn;
