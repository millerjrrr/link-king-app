import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import BloodRedCover from "../../../ui/BloodRedCover";
import { getSettingsState } from "../../../store/settings";
import RedSafetyButton from "../../../ui/Buttons/RedSafetyButton";
import AuthInputField from "../../../components/form/AuthInputField";
import Form from "../../../components/form";
import * as yup from "yup";
import PasswordVisibilityIcon from "../../../ui/PasswordVisibilityIcon";
import { useNavigation } from "@react-navigation/native";
import { authErrorHandler } from "../../../errors/authErrorHandler";
import appTextSource from "../../../utils/appTextSource";
import { useFormikContext } from "formik";
import BusyWrapper from "../../../ui/Loader/BusyWrapper";
import AppText from "../../../ui/AppText";
import { View } from "react-native";
import deleteUserAccount from "../functions/deleteUserAccount";

const FormikSafetyButton = ({
  setElapsedTime,
  setCoverZIndex,
}) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  const completeFunction = () => {
    handleSubmit();
    setTimeout(() => {
      setElapsedTime(0);
      setCoverZIndex(1);
    }, 2000);
  };

  return (
    <BusyWrapper {...{ busy: isSubmitting }}>
      <RedSafetyButton
        {...{
          setElapsedTime,
          completeFunction,
          setCoverZIndex,
          iconName: "delete",
          size: 150,
        }}
      />
    </BusyWrapper>
  );
};

const DeleteAccountScreen = () => {
  const { appLang } = useSelector(getSettingsState);
  const { deleteAccount: heading, deleteAccountDetails } =
    appTextSource[appLang].options.manageAccount;

  // ...loader management...
  const [elapsedTime, setElapsedTime] = useState(0);
  const [coverZIndex, setCoverZIndex] = useState(1);

  const { password } = appTextSource[appLang].auth.forms;

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
      <Form
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
      </Form>
    </PopUpContainer>
  );
};

export default DeleteAccountScreen;
