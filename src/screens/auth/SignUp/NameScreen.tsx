import React from "react";
import SubmitButton from "@components/Buttons/SubmitButton";
import AuthInputField from "@components/AuthInputField";
import * as yup from "yup";
import AuthFormContainer from "@src/components/containers/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import {
  authState,
  updateName as updateNameOnRecord,
} from "@src/store/auth";
import SignUpAppLink from "@components/SignUpAppLink";
import { Formik, FormikHelpers } from "formik";
import useChangeUsername from "@src/hooks/optionsHooks/useChangeUsername";
import { NameScreenProps } from "@src/types/navigationTypes";
import Auth3PButtons from "@src/components/Auth3P/Auth3PButtons";

interface FormValues {
  name: string;
}

const NameScreen: React.FC<NameScreenProps> = ({
  updateName,
  buttonTitle,
}) => {
  const { appLang } = useSelector(settingsState);
  const {
    name: { trim, min, required, label, placeholder },
  } = appTextSource(appLang).auth.forms;

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim(trim)
      .min(3, min)
      .required(required),
  });

  const { accountName } = useSelector(authState);

  const initialValues: FormValues = {
    name: accountName,
  };

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const changeUsername = useChangeUsername();

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    actions.setSubmitting(true);
    await dispatch(updateNameOnRecord(values.name));

    updateName
      ? await changeUsername(values.name)
      : navigation.navigate("Email" as never); // `as never` ensures compatibility with TS navigation typing

    actions.setSubmitting(false);
  };

  const { heading, subHeading } =
    appTextSource(appLang).auth.signUp.name;
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
        {() => (
          <>
            <AuthInputField
              name="name"
              label={label}
              placeholder={placeholder}
              bottomMargin
            />
            <SubmitButton title={buttonTitle || next} />
          </>
        )}
      </Formik>
      {!updateName && <SignUpAppLink />}
      {!updateName && <Auth3PButtons />}
    </AuthFormContainer>
  );
};

export default NameScreen;
