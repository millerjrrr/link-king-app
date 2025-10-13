import { StyleSheet } from "react-native";
import SubmitButton from "@components/Buttons/SubmitButton";
import AuthInputField from "@components/AuthInputField";
import * as yup from "yup";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { authState, updateEmail } from "@src/store/auth";
import SignUpAppLink from "@components/SignUpAppLink";
import { Formik } from "formik";
import Auth3PButtons from "@src/components/Auth3P/Auth3PButtons";
import { AuthStackNavProp } from "@src/types/navigationTypes";

const Email: React.FC<{ navigation: AuthStackNavProp }> = ({
  navigation,
}) => {
  const { appLang } = useSelector(settingsState);
  const { email } = appTextSource(appLang).auth.forms;

  const validationSchema = yup.object({
    email: yup
      .string()
      .trim(email.trim)
      .email(email.email)
      .required(email.required),
  });

  const { accountEmail } = useSelector(authState);

  const initialValues = {
    email: accountEmail,
  };

  const dispatch = useDispatch();

  const onSubmit = async (values: any, actions: any) => {
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
      <Auth3PButtons />
    </AuthFormContainer>
  );
};

export default Email;
