import React, { useEffect } from "react";
import * as yup from "yup";
import AuthFormContainer from "@components/Containers/AuthFormContainer";
import AuthInputField from "@components/AuthInputField";
import SubmitButton from "@components/Buttons/SubmitButton";
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { normalize } from "@src/utils/normalize";
import { Formik, FormikHelpers } from "formik";
import BottomShadow from "@src/components/BottomShadow";
import {
  RouteProp,
  useRoute,
} from "@react-navigation/native";
import { CollectionStackParamList } from "@src/types/navigationTypes";
import useColors from "@src/hooks/utilityHooks/useColors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import appTextSource from "@src/utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import clientWithAuth from "@src/api/clientWithAuth";
import {
  collectionState,
  updateBusy,
  updateSearchKeyword,
} from "@src/store/collection";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import { CreateCustomTicketScreenFormValues } from "@src/types/FormTypes";
import useCreateCustomTicket from "@src/hooks/collectionHooks/useCreateCustomTicket";
import useUpdateSolutions from "@src/hooks/collectionHooks/useUpdateSolutions";
import AppText from "@src/components/AppText";

type CreateCustomTicketScreenRouteProp = RouteProp<
  CollectionStackParamList,
  "Create Custom Ticket"
>;

const CreateCustomTicketScreen = () => {
  const route =
    useRoute<CreateCustomTicketScreenRouteProp>();
  const { target } = route.params;

  const { busy } = useSelector(collectionState);
  const dispatch = useDispatch();

  const { appLang } = useSelector(settingsState);
  const {
    altHeading,
    solutionName,
    newTargetWord,
    importSolutions,
    save,
    required,
    silly,
  } = appTextSource(appLang).console.editTicketScreen;

  const notSilly = yup.string().test(
    "no-bad-solutions", // Unique name for the test
    silly, // Custom error message
    (value) => !value || normalize(value) !== "",
  );

  const validationSchema = yup.object().shape({
    formTarget: notSilly.required(required),
    solution1: notSilly.required(required),
    solution2: notSilly,
    solution3: notSilly,
    solution4: notSilly,
    solution5: notSilly,
    solution6: notSilly,
    solution7: notSilly,
    solution8: notSilly,
  });

  const initialValues: CreateCustomTicketScreenFormValues =
    {
      formTarget: target,
      solution1: "",
      solution2: "",
      solution3: "",
      solution4: "",
      solution5: "",
      solution6: "",
      solution7: "",
      solution8: "",
    };

  const updateSolutions = useUpdateSolutions();
  const createCustomTicket = useCreateCustomTicket();

  const onSubmit = async (
    values: CreateCustomTicketScreenFormValues,
    actions: FormikHelpers<CreateCustomTicketScreenFormValues>,
  ) => {
    try {
      actions.setSubmitting(true);
      await createCustomTicket(values);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const { CONTRAST, SECONDARY } = useColors();

  return (
    <>
      <BottomShadow />
      <AuthFormContainer
        heading={altHeading}
        noScrollView
        nologo
        popUp
      >
        <Formik<CreateCustomTicketScreenFormValues>
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue }) => {
            useEffect(() => {
              dispatch(
                updateSearchKeyword(values.formTarget),
              );
            }, [values.formTarget]);

            return (
              <View style={{ width: "100%", flex: 1 }}>
                <View
                  style={{
                    backgroundColor: SECONDARY,
                    padding: 15,
                    paddingHorizontal: 15,
                    borderRadius: 30,
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      updateSolutions(
                        values.formTarget,
                        setFieldValue,
                      );
                    }}
                  >
                    <MaterialIcons
                      name="translate"
                      size={24}
                      color={CONTRAST}
                    />
                    <AppText style={{ fontSize: 15 }}>
                      {" "}
                      {importSolutions}
                    </AppText>
                  </TouchableOpacity>
                  <AuthInputField
                    key="formTarget"
                    name="formTarget"
                    label={newTargetWord}
                    placeholder=""
                    autoCapitalize="none"
                  />
                </View>
                <BusyWrapper busy={busy} size={70}>
                  <ScrollView
                    showsVerticalScrollIndicator={
                      Platform.OS !== "web"
                    }
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                      padding: 5,
                      paddingHorizontal: 30,
                      alignItems: "center",
                    }}
                  >
                    {Array.from({ length: 8 }).map(
                      (_, index) => (
                        <AuthInputField
                          key={index}
                          name={
                            `solution${index + 1}` as keyof CreateCustomTicketScreenFormValues
                          }
                          label={`${solutionName} ${index + 1}`}
                          placeholder=""
                          bottomMargin
                          autoCapitalize="none"
                        />
                      ),
                    )}
                  </ScrollView>
                </BusyWrapper>
                <View
                  style={{
                    padding: 30,
                    width: "100%",
                  }}
                >
                  <SubmitButton title={save} />
                </View>
                <View style={{ height: 150 }} />
              </View>
            );
          }}
        </Formik>
      </AuthFormContainer>
    </>
  );
};

export default CreateCustomTicketScreen;
