import { StyleSheet } from "react-native";
import SubmitBtn from "../../../components/form/SubmitBtn";
import AuthInputField from "../../../components/form/AuthInputField";
import Form from "../../../components/form";
import * as yup from "yup";
import AuthFormContainer from "../../../components/containers/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import {
  getAuthState,
  updateEmail,
} from "@src/store/auth";
import SignUpAppLink from "../../../components/SignUpAppLink";

const Email = () => {
  const { appLang } = useSelector(getSettingsState);
  const { email } = appTextSource(appLang).auth.forms;

  const validationSchema = yup.object({
    email: yup
      .string()
      .trim(email.trim)
      .email(email.email)
      .required(email.required),
  });

  const { formEmail } = useSelector(getAuthState);

  const initialValues = {
    email: formEmail,
  };

  const dispatch = useDispatch();

  const navigation = useNavigation();

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
      {...{ heading, subHeading, nologo: true }}
    >
      <Form
        {...{ onSubmit, initialValues, validationSchema }}
      >
        <>
          <AuthInputField
            {...{
              name: "email",
              label: email.label,
              placeholder: email.placeholder,
              keyboardType: "email-address",
              autoCapitalize: "none",
              containerStyle: { marginBottom: 20 },
            }}
          />
          <SubmitBtn {...{ title: next }} />
        </>
      </Form>
      <SignUpAppLink />
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
