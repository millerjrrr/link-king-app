import React, { useState } from "react";
import { useSelector } from "react-redux";
import PopUpContainer from "../../components/Containers/PopUpContainer";
import BloodRedCover from "../../components/BloodRedCover";
import { settingsState } from "@src/store/settings";
import AuthInputField from "../../components/AuthInputField";
import * as yup from "yup";
import PasswordVisibilityIcon from "../../components/PasswordVisibilityIcon";
import appTextSource from "@src/utils/appTextSource";
import AppText from "../../components/AppText";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FormikSafetyButton from "../../components/Buttons/FormikSafetyButton";
import { Formik } from "formik";
import useDeleteAccount from "@src/hooks/optionsHooks/useDeleteAccount";

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
  const onSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    await deleteAccount({
      password: values.password,
    });
    actions.setSubmitting(false);
  };

  return (
    <PopUpContainer {...{ heading, blockPopToTop: true }}>
      <ScrollView>
        <BloodRedCover />
        <AppText
          {...{ style: { padding: 15, fontSize: 20 } }}
        >
          {deleteAccountDetails}
        </AppText>
        <Formik
          {...{
            onSubmit,
            initialValues,
            validationSchema,
          }}
        >
          <View
            {...{
              style: {
                marginHorizontal: 15,
                zIndex: 2,
              },
            }}
          >
            <AuthInputField
              {...{
                name: "password",
                label: password.label,
                placeholder: "********",
                autoCapitalize: "none",
                secureTextEntry: secureEntry,
                rightIcon: (
                  <PasswordVisibilityIcon
                    {...{ privateIcon: secureEntry }}
                  />
                ),
                onRightIconPress: togglePasswordView,
              }}
            />
            <TouchableWithoutFeedback
              onPress={() => Keyboard.dismiss()}
            >
              <View style={{ height: 250 }}>
                <FormikSafetyButton />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Formik>
      </ScrollView>
    </PopUpContainer>
  );
};

export default DeleteAccountScreen;
