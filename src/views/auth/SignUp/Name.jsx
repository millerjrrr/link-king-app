import SubmitBtn from "../../../components/form/SubmitBtn";
import AuthInputField from "../../../components/form/AuthInputField";
import Form from "../../../components/form";
import * as yup from "yup";
import AuthFormContainer from "../../../components/containers/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../../../store/settings";
import appTextSource from "../../../utils/appTextSource";
import {
  getAuthState,
  updateName,
} from "../../../store/auth";
import updateNameOnServer from "../../../options/ManageAccountScreen/functions/updateNameOnServer";

const Name = ({ updateNameFunction, buttonTitle }) => {
  const { appLang } = useSelector(getSettingsState);
  const { name } = appTextSource[appLang].auth.forms;

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
        dispatch(updateName(values.name));
        updateNameOnServer({
          username: values.name,
          dispatch,
          navigation,
          appLang,
        });
        actions.setSubmitting(false);
      }
    : async (values, actions) => {
        actions.setSubmitting(true);
        dispatch(updateName(values.name));
        navigation.navigate("Email");
        actions.setSubmitting(false);
      };

  const { heading, subHeading } =
    appTextSource[appLang].auth.signUp.name;
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
              name: "name",
              label: name.label,
              placeholder: name.placeholder,
              containerStyle: { marginBottom: 20 },
            }}
          />
          <SubmitBtn {...{ title: buttonTitle || next }} />
        </>
      </Form>
    </AuthFormContainer>
  );
};

export default Name;
