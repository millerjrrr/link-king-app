import { StyleSheet, View } from "react-native";
import SubmitButton from "@src/components/Buttons/SubmitButton";
import AppLink from "@src/components/AppLink";
import AuthInputField from "@src/components/AuthInputField";
import * as yup from "yup";
import PasswordVisibilityIcon from "@src/components/PasswordVisibilityIcon";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import client from "@src/api/client";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "@src/store/auth";
import { useState } from "react";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { Formik } from "formik";
import useCatchAsync from "@src/hooks/utilityHooks/useCatchAsync";
import Auth3PButtons from "@src/components/Auth3P/Auth3PButtons";
import useUpdateAuthData from "@src/hooks/authHooks/useUpdateAuthData";

const SignIn = () => {
  const { appLang } = useSelector(settingsState);
  const { email, password } =
    appTextSource(appLang).auth.forms;

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
  const { accountEmail } = useSelector(authState);

  const initialValues = {
    email: accountEmail,
    password: "",
  };

  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation();
  const catchAsync = useCatchAsync();
  const updateAuthData = useUpdateAuthData();

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const onSubmit = catchAsync(async (values, actions) => {
    //console.log("# Signing In");
    actions.setSubmitting(true);
    try {
      const { data } = await client.post(
        "/api/v1/users/log-in",
        {
          ...values,
        },
        {
          timeout: 3000,
          headers: {
            "Accept-Language": appLang,
          },
        },
      );

      if (data.status === "success") updateAuthData(data);
    } finally {
      actions.setSubmitting(false);
    }
  });

  const { heading } = appTextSource(appLang).auth.signIn;
  const { signIn, signUp, lostPassword } =
    appTextSource(appLang).auth.titles;

  return (
    <AuthFormContainer heading={heading} back={false}>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <>
          <AuthInputField
            name={"email"}
            label={email.label}
            placeholder={email.placeholder}
            keyboardType={"email-address"}
            autoCapitalize={"none"}
            bottomMargin
          />
          <AuthInputField
            name={"password"}
            label={password.label}
            placeholder={"********"}
            autoCapitalize={"none"}
            secureTextEntry={secureEntry}
            rightIcon={
              <PasswordVisibilityIcon
                privateIcon={secureEntry}
              />
            }
            onRightIconPress={togglePasswordView}
          />
          <View style={styles.linkContainer}>
            <AppLink
              title={signUp}
              onPress={() => {
                navigation.navigate("Welcome");
              }}
            />
            <AppLink
              title={lostPassword}
              onPress={() => {
                navigation.navigate("Lost Password");
              }}
            />
          </View>
          <SubmitButton title={signIn} />
        </>
      </Formik>
      <Auth3PButtons />
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});

export default SignIn;
