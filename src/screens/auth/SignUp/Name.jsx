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
  updateName,
} from "@src/store/auth";
import updateNameOnServer from "../../../options/ManageAccountScreen/functions/updateNameOnServer";
import SignUpAppLink from "../../../components/SignUpAppLink";

const Name = ({ updateNameFunction, buttonTitle }) => {
  const { appLang } = useSelector(getSettingsState);
  const { name } = appTextSource(appLang).auth.forms;

  const validationSchema = yup.object({
    name: yup
      .string()
      .trim(name.trim)
      .min(3, name.min)
      .required(name.required),
  });

  const { formName } = useSelector(getAuthState);

  const initialValues = {
    name: formName,
  };

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const onSubmit = updateNameFunction
    ? async (values, actions) => {
        actions.setSubmitting(true);
        await dispatch(updateName(values.name));
        await updateNameOnServer({
          username: values.name,
          dispatch,
          navigation,
          appLang,
        });
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
      {...{ heading, subHeading, nologo: true }}
    >
      <Form
        {...{ onSubmit, initialValues, validationSchema }}
      >
        <>
          <AuthInputField
            {...{
              name: "name",
              label: name.label,
              placeholder: name.placeholder,
              containerStyle: { marginBottom: 20 },
            }}
          />
          <SubmitBtn {...{ title: buttonTitle || next }} />
        </>
      </Form>
      {!updateNameFunction ? <SignUpAppLink /> : null}
    </AuthFormContainer>
  );
};

export default Name;