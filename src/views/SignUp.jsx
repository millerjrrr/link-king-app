import colors from "../utils/colors";
import {
  Text,
  Button,
  StyleSheet,
  View,
} from "react-native";
import SubmitBtn from "../components/form/SubmitBtn";
import SafeAreaAndroid from "../utils/SafeAreaAndroid";
import AuthInputField from "../components/form/AuthInputField";
import Form from "../components/form/index";
import * as yup from "yup";
import PasswordVisibilityIcon from "../ui/PasswordVisibilityIcon";
import { useState } from "react";

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
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password is too simple!",
    )
    .required("Password is required!"),
});
const initialValues = {
  name: "",
  email: "",
  password: "",
};

const SignUp = (props) => {
  const [secureEntry, setSecureEntry] = useState(true);

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  return (
    <SafeAreaAndroid style={styles.container}>
      <Form
        onSubmit={(values) => {
          console.log(values);
        }}
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
          <SubmitBtn title="Sign Up" />
        </View>
      </Form>
    </SafeAreaAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: colors.CONTRAST,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 15,
  },
  marginBottom: {
    marginBottom: 20,
  },
});

export default SignUp;
