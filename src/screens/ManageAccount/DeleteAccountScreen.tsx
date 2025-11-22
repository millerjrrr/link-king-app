import React, { useState } from "react";
import { useSelector } from "react-redux";
import PopUpContainer from "@src/components/containers/PopUpsContainer";
import BloodRedCover from "@components/BloodRedCover";
import { settingsState } from "@src/store/settings";
import AuthInputField from "@components/AuthInputField";
import * as yup from "yup";
import PasswordVisibilityIcon from "@components/PasswordVisibilityIcon";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@components/AppText";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FormikSafetyButton from "@components/Buttons/FormikSafetyButton";
import { Formik } from "formik";
import useDeleteAccount from "@src/hooks/optionsHooks/useDeleteAccount";
import ForgotOrDidntSetUpPassword from "@src/components/ForgotOrDidntSetUpPassword";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const DeleteAccountScreen = () => {
  const { appLang } = useSelector(settingsState);
  const { deleteAccount: heading, deleteAccountDetails } =
    appTextSource(appLang).options.manageAccount;

  const { password } = appTextSource(appLang).auth.forms;

  const validationSchema = yup.object({
    password: yup
      .string()
      .trim(password.trim)
      .required(password.required),
  });

  const initialValues = {
    password: "",
  };

  const [secureEntry, setSecureEntry] = useState(true);

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const deleteAccount = useDeleteAccount();
  const onSubmit = async (values: any, actions: any) => {
    actions.setSubmitting(true);
    await deleteAccount({
      password: values.password,
    });
    actions.setSubmitting(false);
  };

  return (
    <PopUpContainer {...{ heading }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ height: "100%" }}
      >
        <BloodRedCover />
        <AppText
          style={{
            padding: base * 15,
            fontSize: base * 20,
          }}
        >
          {deleteAccountDetails}
        </AppText>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <View
            style={{
              marginHorizontal: base * 15,
              zIndex: 2,
            }}
          >
            <AuthInputField
              name="password"
              label={password.label}
              placeholder="********"
              autoCapitalize="none"
              secureTextEntry={secureEntry}
              rightIcon={
                <PasswordVisibilityIcon
                  {...{ privateIcon: secureEntry }}
                />
              }
              onRightIconPress={togglePasswordView}
            />
            <TouchableWithoutFeedback
              onPress={() => Keyboard.dismiss()}
            >
              <View>
                <FormikSafetyButton />
              </View>
            </TouchableWithoutFeedback>
            <ForgotOrDidntSetUpPassword />
          </View>
        </Formik>
      </ScrollView>
    </PopUpContainer>
  );
};

export default DeleteAccountScreen;
