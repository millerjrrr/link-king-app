import SubmitBtn from "../../../components/form/SubmitBtn";
import AuthInputField from "../../../components/form/AuthInputField";
import Form from "../../../components/form";
import * as yup from "yup";
import AuthFormContainer from "../../../components/containers/AuthFormContainer";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import {
  getAuthState,
  updateEmail,
  updateLoggedInState,
  updateToken,
} from "@src/store/auth";
import { authErrorHandler } from "@src/errors/authErrorHandler";
import client from "@src/api/client";
import SignUpAppLink from "../../../components/SignUpAppLink";
import { saveToAsyncStorage } from "@src/utils/asyncStorage";

const VerificationCode = () => {
  const { appLang } = useSelector(getSettingsState);
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

  const { unverifiedUserId } = useSelector(getAuthState);

  const initialValues = {
    code: "",
  };

  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    values.unverifiedUserId = unverifiedUserId;

    actions.setSubmitting(true);

    try {
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
      dispatch(updateLoggedInState(true));
      dispatch(updateEmail(""));
    } catch (error) {
      authErrorHandler(error, dispatch);
    }
    actions.setSubmitting(false);
  };

  const { heading, subHeading, subHeading2, verify } =
    appTextSource(appLang).auth.signUp.code;

  const { formEmail } = useSelector(getAuthState);

  const newSubHeading =
    subHeading + "(" + formEmail + "). " + subHeading2;

  return (
    <AuthFormContainer
      {...{
        heading,
        subHeading: newSubHeading,
        nologo: true,
      }}
    >
      <Form
        {...{ onSubmit, initialValues, validationSchema }}
      >
        <>
          <AuthInputField
            {...{
              name: "code",
              keyboardType: "numeric",
              placeholder: "",
              label: code.label,
              containerStyle: { marginBottom: 20 },
            }}
          />
          <SubmitBtn {...{ title: verify }} />
        </>
      </Form>
      <SignUpAppLink />
    </AuthFormContainer>
  );
};

export default VerificationCode;
