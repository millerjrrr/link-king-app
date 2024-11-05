import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopUpContainer from "../../components/containers/PopUpContainer";
import BloodRedCover from "../../components/BloodRedCover";
import { settingsState } from "@src/store/settings";
import AuthInputField from "../../components/AuthInputField";
import * as yup from "yup";
import PasswordVisibilityIcon from "../../components/PasswordVisibilityIcon";
import appTextSource from "@src/utils/appTextSource";
import AppText from "../../components/AppText";
import { View } from "react-native";
import deleteUserAccount from "../../utils/optionsFunctions/deleteUserAccount";
import FormikSafetyButton from "../../components/Buttons/FormikSafetyButton";
import { Formik } from "formik";

const DeleteAccountScreen = () => {
  const { appLang } = useSelector(settingsState);
  const { deleteAccount: heading, deleteAccountDetails } =
    appTextSource(appLang).options.manageAccount;

  // ...loader management...
  const [elapsedTime, setElapsedTime] = useState(0);
  const [coverZIndex, setCoverZIndex] = useState(1);

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
  const dispatch = useDispatch();

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    await deleteUserAccount({
      password: values.password,
      dispatch,
      appLang,
    });
    actions.setSubmitting(false);
  };

  return (
    <PopUpContainer {...{ heading, blockPopToTop: true }}>
      <BloodRedCover {...{ elapsedTime, coverZIndex }} />
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
          <View style={{ height: 250 }}>
            <FormikSafetyButton
              {...{
                setElapsedTime,
                setCoverZIndex,
              }}
            />
          </View>
        </View>
      </Formik>
    </PopUpContainer>
  );
};

export default DeleteAccountScreen;
