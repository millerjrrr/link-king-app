import SubmitButton from "../../components/Buttons/SubmitButton";
import AuthInputField from "../../components/AuthInputField";
import * as yup from "yup";
import AuthFormContainer from "../../components/Containers/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { authState, updateName } from "@src/store/auth";
import SignUpAppLink from "../../components/SignUpAppLink";
import { Formik } from "formik";
import useChangeUsername from "@src/hooks/optionsHooks/useChangeUsername";

const Name = ({ updateNameFunction, buttonTitle }) => {
  const { appLang } = useSelector(settingsState);
  const { name } = appTextSource(appLang).auth.forms;

  const validationSchema = yup.object({
    name: yup
      .string()
      .trim(name.trim)
      .min(3, name.min)
      .required(name.required),
  });

  const { formName } = useSelector(authState);

  const initialValues = {
    name: formName,
  };

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const changeUsername = useChangeUsername();

  const onSubmit = updateNameFunction
    ? async (values, actions) => {
        actions.setSubmitting(true);
        await dispatch(updateName(values.name));
        await changeUsername(values.name);
        actions.setSubmitting(false);
      }
    : async (values, actions) => {
        actions.setSubmitting(true);
        await dispatch(updateName(values.name));
        await navigation.navigate("Email");
        actions.setSubmitting(false);
      };

  const { heading, subHeading } =
    appTextSource(appLang).auth.signUp.name;
  const { next } = appTextSource(appLang).auth.titles;

  return (
    <AuthFormContainer
      heading={heading}
      subHeading={subHeading}
      nologo={true}
    >
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <>
          <AuthInputField
            name={"name"}
            label={name.label}
            placeholder={name.placeholder}
            containerStyle={{ marginBottom: 20 }}
          />
          <SubmitButton title={buttonTitle || next} />
        </>
      </Formik>
      {!updateNameFunction ? <SignUpAppLink /> : null}
    </AuthFormContainer>
  );
};

export default Name;
