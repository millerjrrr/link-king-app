import { StyleSheet, View } from "react-native";
import SubmitBtn from "../../../components/form/SubmitBtn";
import AppLink from "../../../components/AppLink";
import AuthInputField from "../../../components/form/AuthInputField";
import Form from "../../../components/form";
import * as yup from "yup";
import AuthFormContainer from "../../../components/containers/AuthFormContainer";
import { useNavigation } from "@react-navigation/native";
import client from "@src/api/client";
import { useDispatch, useSelector } from "react-redux";
import { authErrorHandler } from "@src/errors/authErrorHandler";
import appTextSource from "@src/utils/appTextSource";
import { getSettingsState } from "@src/store/settings";

const LostPassword = () => {
  const { appLang } = useSelector(getSettingsState);
  const { email } = appTextSource(appLang).auth.forms;

  const validationSchema = yup.object({
    email: yup
      .string()
      .trim(email.trim)
      .email(email.email)
      .required(email.required),
  });
  const initialValues = {
    email: "",
  };
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    try {
      const { data } = await client.post(
        "/api/v1/users/forgot-password",
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
      if (data.status === "success")
        navigation.navigate("CheckYourEmail");
    } catch (error) {
      authErrorHandler(error, dispatch);
    }
    actions.setSubmitting(false);
  };

  const { sendLink, signIn, signUp } =
    appTextSource(appLang).auth.titles;

  const { heading, subHeading } =
    appTextSource(appLang).auth.lostPassword;

  return (
    <AuthFormContainer
      {...{
        heading,
        subHeading,
      }}
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
            }}
          />
          <View style={styles.linkContainer}>
            <AppLink
              {...{
                title: signIn,
                onPress: () =>
                  navigation.navigate("SignIn"),
              }}
            />
            <AppLink
              {...{
                title: signUp,
                onPress: () =>
                  navigation.navigate("Welcome", {
                    key: "start",
                  }),
              }}
            />
          </View>
          <SubmitBtn {...{ title: sendLink }} />
        </>
      </Form>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});

export default LostPassword;
