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

const SignUp = (props) => {
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation();

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const handleSubmit = async (values, actions) => {
    values.passwordConfirm = values.password;
    values.username = values.name;
    console.log({ ...values });

    actions.setSubmitting(true);
    try {
      const res = await client.post(
        "/api/v1/users/signup",

        {
          ...values,
        },
      );
      console.log(res);
    } catch (error) {
      console.log("Sign up error", error);
    }
    actions.setSubmitting(false);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      signUpSchema={signUpSchema}
    >
      <AuthFormContainer
        heading="Welcome!"
        subHeading="Let's get started by creating your account."
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
          <SubmitBtn title="Sign Up" />
          <View style={styles.linkContainer}>
            <AppLink
              title="I lost my password"
              onPress={() => {
                navigation.navigate("LostPassword");
              }}
            />
            <AppLink
              title="Sign in"
              onPress={() => {
                navigation.navigate("SignIn");
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

export default SignUp;
