import SubmitBtn from "../../../components/form/SubmitBtn";
import AuthInputField from "../../../components/form/AuthInputField";
import Form from "../../../components/form";
import * as yup from "yup";
import PasswordVisibilityIcon from "../../../components/PasswordVisibilityIcon";
import AuthFormContainer from "../../../components/containers/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import client from "@src/api/client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authErrorHandler } from "@src/errors/authErrorHandler";
import { getSettingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import {
  getAuthState,
  updateName,
  updateUnverifiedUserId,
} from "@src/store/auth";
import SignUpAppLink from "../../../components/SignUpAppLink";

const Password = () => {
  const { appLang } = useSelector(getSettingsState);
  const { password } = appTextSource(appLang).auth.forms;

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
    const { password } = values;

    actions.setSubmitting(true);
    try {
      const { data } = await client.post(
        "/api/v1/users/sign-up",
        {
          username: formName,
          email: formEmail,
          password,
          passwordConfirm: password,
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
        dispatch(
          updateUnverifiedUserId(data.unverifiedUserId),
        );
        navigation.navigate("VerificationCode");
      }
    } catch (error) {
      authErrorHandler(error, dispatch);
      if (error?.response?.data?.message?.includes("[#1]"))
        setTimeout(
          () => navigation.navigate("VerificationCode"),
          3000,
        );
    }
    actions.setSubmitting(false);
  };

  const { heading, subHeading } =
    appTextSource(appLang).auth.signUp.password;

  const { signUp } = appTextSource(appLang).auth.titles;

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
      <SignUpAppLink />
    </AuthFormContainer>
  );
};

export default Password;
