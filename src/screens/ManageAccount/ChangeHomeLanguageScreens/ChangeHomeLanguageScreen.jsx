import React, { useState } from "react";
import { useSelector } from "react-redux";
import PopUpContainer from "../../../components/Containers/PopUpContainer";
import BloodRedCover from "../../../components/BloodRedCover";
import { settingsState } from "@src/store/settings";
import AuthInputField from "../../../components/AuthInputField";
import * as yup from "yup";
import PasswordVisibilityIcon from "../../../components/PasswordVisibilityIcon";
import appTextSource from "@src/utils/appTextSource";
import AppText from "../../../components/AppText";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FormikSafetyButton from "../../../components/Buttons/FormikSafetyButton";
import FlagImage from "../../../components/Graphics/FlagImage";
import { AntDesign } from "@expo/vector-icons";
import colors from "@src/utils/colors";
import { Formik } from "formik";
import useChangeHomeLanguage from "@src/hooks/optionsHooks/useChangeHomeLanguage";

const ChangeHomeLanguageScreen = ({ route }) => {
  const newLanguage = route.params.code;
  const { appLang, colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  const {
    changeHomeLanguage: heading,
    changeHomeLanguageDetails,
  } = appTextSource(appLang).options.manageAccount;

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

  const changeHomeLanguage = useChangeHomeLanguage();

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    await changeHomeLanguage({
      password: values.password,
      newLanguage,
    });
    actions.setSubmitting(false);
  };

  return (
    <PopUpContainer {...{ heading, blockPopToTop: true }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          height: "100%",
        }}
      >
        <BloodRedCover />
        <View
          {...{
            style: {
              flexDirection: "row",
              alignItems: "center",
            },
          }}
        >
          <FlagImage {...{ flag1: appLang, scale: 1.5 }} />
          <AntDesign
            {...{
              name: "arrowright",
              size: 48,
              color,
            }}
          />
          <FlagImage
            {...{ flag1: newLanguage, scale: 1.5 }}
          />
        </View>
        <AppText
          {...{ style: { padding: 15, fontSize: 20 } }}
        >
          {changeHomeLanguageDetails}
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
                <FormikSafetyButton iconName="sync" />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Formik>
      </ScrollView>
    </PopUpContainer>
  );
};

export default ChangeHomeLanguageScreen;
