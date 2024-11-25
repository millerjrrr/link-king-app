import { StyleSheet, View } from "react-native";
import SubmitButton from "../../components/Buttons/SubmitButton";
import AppLink from "../../components/AppLink";
import AuthInputField from "../../components/AuthInputField";
import AuthFormContainer from "../../components/Containers/AuthFormContainer";
import client from "@src/api/client";
import { useSelector } from "react-redux";
import appTextSource from "@src/utils/appTextSource";
import { settingsState } from "@src/store/settings";
import useCatchAsync from "@src/hooks/useCatchAsync";
import * as yup from "yup";
import { Formik } from "formik";

const LostPassword = ({ navigation }) => {
  const { appLang } = useSelector(settingsState);
  const {
    forms: { email },
    titles: { sendLink, signIn, signUp },
    lostPassword: { heading, subHeading },
  } = appTextSource(appLang).auth;

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

  const catchAsync = useCatchAsync();

  const onSubmit = catchAsync(async (values, actions) => {
    console.log("# Getting new password");
    actions.setSubmitting(true);
    try {
      const { data } = await client.post(
        "/api/v1/users/forgot-password",
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
      if (data.status === "success")
        navigation.navigate("CheckYourEmail");
    } finally {
      actions.setSubmitting(false);
    }
  });

  return (
    <AuthFormContainer
      heading={heading}
      subHeading={subHeading}
    >
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
          />
          <View style={styles.linkContainer}>
            <AppLink
              title={signIn}
              onPress={() => navigation.navigate("SignIn")}
            />
            <AppLink
              title={signUp}
              onPress={() =>
                navigation.navigate("Welcome", {
                  key: "start",
                })
              }
            />
          </View>
          <SubmitButton title={sendLink} />
        </>
      </Formik>
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

export default LostPassword;
