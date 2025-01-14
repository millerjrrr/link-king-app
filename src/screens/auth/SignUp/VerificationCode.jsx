import SubmitButton from "@components/Buttons/SubmitButton";
import AuthInputField from "@components/AuthInputField";
import * as yup from "yup";
import AuthFormContainer from "@components/Containers/AuthFormContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  settingsState,
  updateSettings,
} from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import {
  authState,
  updateEmail,
  updateJustSignedUp,
  updateLoggedInState,
  updateToken,
} from "@src/store/auth";
import client from "@src/api/client";
import SignUpAppLink from "@components/SignUpAppLink";
import { saveToAsyncStorage } from "@src/utils/asyncStorage";
import { Formik } from "formik";
import useCatchAsync from "@src/hooks/useCatchAsync";
import { updateDictionary } from "@src/store/console";

const VerificationCode = () => {
  const { appLang } = useSelector(settingsState);
  const { code } = appTextSource(appLang).auth.forms;

  const validationSchema = yup.object({
    code: yup
      .string()
      .matches(/\d+$/, code.matches)
      .trim(code.trim)
      .min(6, code.min)
      .max(6, code.max)
      .required(code.required),
  });

  const { unverifiedUserId } = useSelector(authState);

  const initialValues = {
    code: "",
  };

  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();

  const onSubmit = catchAsync(async (values, actions) => {
    //console.log("# Verifying the code");
    try {
      values.unverifiedUserId = unverifiedUserId;
      actions.setSubmitting(true);
      const { data } = await client.post(
        "/api/v1/users/sign-up-verification",
        {
          ...values,
        },
        {
          timeout: 6000,
          headers: {
            "Accept-Language": appLang,
          },
        },
      );
      await saveToAsyncStorage("auth-token", data.token);
      dispatch(updateToken(data.token));
      dispatch(
        updateSettings({
          appLang: data.data.user.homeLanguage,
        }),
      );
      dispatch(updateDictionary(data.data.user.dictionary));
      dispatch(updateLoggedInState(true));
      dispatch(updateJustSignedUp(true));
      dispatch(updateEmail(""));
    } finally {
      actions.setSubmitting(false);
    }
  });

  const { heading, subHeading, subHeading2, verify } =
    appTextSource(appLang).auth.signUp.code;

  const { formEmail } = useSelector(authState);

  const newSubHeading =
    subHeading + "(" + formEmail + "). " + subHeading2;

  return (
    <AuthFormContainer
      heading={heading}
      subHeading={newSubHeading}
      nologo
    >
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <>
          <AuthInputField
            name={"code"}
            keyboardType={"numeric"}
            placeholder={""}
            label={code.label}
            bottomMargin
          />
          <SubmitButton title={verify} />
        </>
      </Formik>
      <SignUpAppLink />
    </AuthFormContainer>
  );
};

export default VerificationCode;
