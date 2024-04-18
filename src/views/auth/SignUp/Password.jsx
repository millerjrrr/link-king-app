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
  updateName,
} from "../../../store/auth";

const Password = () => {
  const { appLang } = useSelector(getSettingsState);
  const { password } = appTextSource[appLang].auth.forms;

  const validationSchema = yup.object({
    password: yup
      .string()
      .trim(password.trim)
      .min(8, password.min)
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).*$/,
        password.matches,
      )
      .required(password.required),
  });

  const initialValues = {
    password: "",
  };

  const dispatch = useDispatch();

  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation();

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const { formName, formEmail } = useSelector(getAuthState);

  const onSubmit = async (values, actions) => {
    values.passwordConfirm = values.password;
    values.username = formName;
    values.email = formEmail;

    actions.setSubmitting(true);
    try {
      const { data } = await client.post(
        "/api/users/sign-up",
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

      if (data.status === "success") {
        dispatch(updateName(""));
        dispatch(updateEmail(""));
        navigation.navigate("CheckYourEmail", {
          key: "verification",
        });
      }
    } catch (error) {
      authErrorHandler(error, dispatch);
    }
    actions.setSubmitting(false);
  };

  const { heading, subHeading } =
    appTextSource[appLang].auth.signUp.password;

  const { signUp } = appTextSource[appLang].auth.titles;

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
              name: "password",
              label: password.label,
              placeholder: "********",
              autoCapitalize: "none",
              secureTextEntry: secureEntry,
              containerStyle: { marginBottom: 20 },
              rightIcon: (
                <PasswordVisibilityIcon
                  {...{ privateIcon: secureEntry }}
                />
              ),
              onRightIconPress: togglePasswordView,
            }}
          />
          <SubmitBtn {...{ title: signUp }} />
        </>
      </Form>
    </AuthFormContainer>
  );
};

export default Password;
