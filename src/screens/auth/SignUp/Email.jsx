import { StyleSheet } from "react-native";
import SubmitButton from "@components/Buttons/SubmitButton";
import AuthInputField from "@components/AuthInputField";
import * as yup from "yup";
import AuthFormContainer from "@components/Containers/AuthFormContainer";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { authState, updateEmail } from "@src/store/auth";
import SignUpAppLink from "@components/SignUpAppLink";
import { Formik } from "formik";
import GoogleAuthButton from "@src/components/GoogleAuthButton";

const Email = ({ navigation }) => {
  const { appLang } = useSelector(settingsState);
  const { email } = appTextSource(appLang).auth.forms;

  const validationSchema = yup.object({
    email: yup
      .string()
      .trim(email.trim)
      .email(email.email)
      .required(email.required),
  });

  const { formEmail } = useSelector(authState);

  const initialValues = {
    email: formEmail,
  };

  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    await dispatch(updateEmail(values.email));
    await navigation.navigate("Password");
    actions.setSubmitting(false);
  };

  const { heading, subHeading } =
    appTextSource(appLang).auth.signUp.email;

  const { next } = appTextSource(appLang).auth.titles;

  return (
    <AuthFormContainer
      heading={heading}
      subHeading={subHeading}
      nologo
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
            bottomMargin
          />
          <SubmitButton title={next} />
        </>
      </Formik>
      <SignUpAppLink />
      <GoogleAuthButton />
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Email;
