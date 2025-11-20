import SubmitButton from "@components/Buttons/SubmitButton";
import AuthInputField from "@components/AuthInputField";
import * as yup from "yup";
import PasswordVisibilityIcon from "@components/PasswordVisibilityIcon";
import AuthFormContainer from "@src/components/containers/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import client from "@src/api/client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import {
  authState,
  updateName,
  updateUnverifiedUserId,
} from "@src/store/auth";
import SignUpAppLink from "@components/SignUpAppLink";
import { Formik } from "formik";
import useCatchAsync from "@src/hooks/utilityHooks/useCatchAsync";
import Auth3PButtons from "@src/components/Auth3P/Auth3PButtons";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@src/types/navigationTypes";

const Password = () => {
  const { appLang } = useSelector(settingsState);
  const { password } = appTextSource(appLang).auth.forms;

  const validationSchema = yup.object({
    password: yup
      .string()
      .trim(password.trim)
      .min(8, password.min)
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).*$/,
        password.matches
      )
      .required(password.required),
  });

  const initialValues = {
    password: "",
  };

  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();

  const [secureEntry, setSecureEntry] = useState(true);
  const navigation =
    useNavigation<
      StackNavigationProp<AuthStackParamList>
    >();

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const { accountName, accountEmail } =
    useSelector(authState);

  const onSubmit = catchAsync(async (values, actions) => {
    //console.log("# Signing Up");
    try {
      actions.setSubmitting(true);
      const { password } = values;
      const { data } = await client.post(
        "/api/v1/users/sign-up",
        {
          username: accountName,
          email: accountEmail,
          password,
          passwordConfirm: password,
        },
        {
          timeout: 3000,
          headers: {
            "Accept-Language": appLang,
          },
        }
      );

      if (data.status === "success") {
        dispatch(updateName(""));
        dispatch(
          updateUnverifiedUserId(data.unverifiedUserId)
        );
        navigation.navigate("Verification Code");
      }
    } finally {
      actions.setSubmitting(false);
    }
  });

  const { heading, subHeading } =
    appTextSource(appLang).auth.signUp.password;

  const { signUp } = appTextSource(appLang).auth.titles;

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
            name={"password"}
            label={password.label}
            placeholder={"********"}
            autoCapitalize={"none"}
            secureTextEntry={secureEntry}
            bottomMargin
            rightIcon={
              <PasswordVisibilityIcon
                privateIcon={secureEntry}
              />
            }
            onRightIconPress={togglePasswordView}
          />
          <SubmitButton title={signUp} />
        </>
      </Formik>
      <SignUpAppLink />
      <Auth3PButtons />
    </AuthFormContainer>
  );
};

export default Password;
