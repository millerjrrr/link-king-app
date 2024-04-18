import { StyleSheet, View } from "react-native";
import SubmitBtn from "../../../components/form/SubmitBtn";
import AppLink from "../../../ui/AppLink";
import AuthInputField from "../../../components/form/AuthInputField";
import Form from "../../../components/form";
import * as yup from "yup";
import PasswordVisibilityIcon from "../../../ui/PasswordVisibilityIcon";
import AuthFormContainer from "../../../components/containers/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import client from "../../../api/client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authErrorHandler } from "../../../errors/authErrorHandler";
import { getSettingsState } from "../../../store/settings";
import appTextSource from "../../../utils/appTextSource";
import {
  getAuthState,
  updateEmail,
} from "../../../store/auth";

const Email = () => {
  const { appLang } = useSelector(getSettingsState);
  const { email } = appTextSource[appLang].auth.forms;

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
    dispatch(updateEmail(values.email));
    navigation.navigate("Password");

    actions.setSubmitting(false);
  };

  const { heading, subHeading } =
    appTextSource[appLang].auth.signUp.email;

  const { next } = appTextSource[appLang].auth.titles;

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
