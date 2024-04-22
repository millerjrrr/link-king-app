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
  refreshPage,
  updateName,
  updateUnverifiedUserId,
} from "../../../store/auth";
import { authErrorHandler } from "../../../errors/authErrorHandler";
import client from "../../../api/client";
import { StyleSheet, View } from "react-native";
import AppLink from "../../../ui/AppLink";
import { useState } from "react";
import AppModal from "../../../ui/AppModal";

const VerificationCode = () => {
  const { appLang } = useSelector(getSettingsState);
  const { code } = appTextSource[appLang].auth.forms;

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

  const navigation = useNavigation();

  const onSubmit = async (values, actions) => {
    values.unverifiedUserId = unverifiedUserId;

    actions.setSubmitting(true);

    try {
      const { data } = await client.post(
        "/api/users/sign-up-verification",
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
      if (data.status === "success") {
        dispatch(updateName(""));
        dispatch(updateUnverifiedUserId(""));
        navigation.navigate("Welcome", { key: "finish" });
      }
    } catch (error) {
      authErrorHandler(error, dispatch);
    }
    actions.setSubmitting(false);
  };

  const { heading, subHeading, verify, cancel, resend } =
    appTextSource[appLang].auth.signUp.code;

  const [isModalVisible, setIsModalVisible] =
    useState(false);

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
              name: "code",
              keyboardType: "numeric",
              placeholder: "",
              label: code.label,
              containerStyle: { marginBottom: 20 },
            }}
          />
          <SubmitBtn {...{ title: verify }} />
          <View style={styles.linkContainer}>
            <AppLink
              title={cancel}
              onPress={() => setIsModalVisible("true")}
            />
          </View>
          <AppModal
            {...{
              isVisible: isModalVisible,
              onBackdropPress: () =>
                setIsModalVisible(false),
              modalName: "signUp",
              onPress: () => {
                navigation.navigate("SignIn");
              },
            }}
          />
        </>
      </Form>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
});

export default VerificationCode;
