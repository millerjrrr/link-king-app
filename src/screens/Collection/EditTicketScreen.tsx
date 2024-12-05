import React from "react";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import * as yup from "yup";
import AuthFormContainer from "@components/Containers/AuthFormContainer";
import AuthInputField from "@components/AuthInputField";
import SubmitButton from "@components/Buttons/SubmitButton";
import { Platform, ScrollView, View } from "react-native";
import { normalize } from "@src/utils/normalize";
import appTextSource from "@src/utils/appTextSource";
import useSaveTicket from "@src/hooks/collectionHooks/useSaveTicket";
import { Formik, FormikHelpers } from "formik";
import BottomShadow from "@src/components/BottomShadow";
import { collectionState } from "@src/store/collection";

interface FormValues {
  newSolutions1: string;
  newSolutions2: string;
  newSolutions3: string;
  newSolutions4: string;
  newSolutions5: string;
  newSolutions6: string;
  newSolutions7: string;
  newSolutions8: string;
}

const EditTicketScreen = () => {
  // not using route and route.params because
  // we need to update solutions in edit ticket screen
  // and have changes propogate when we go back
  const { appLang } = useSelector(settingsState);
  const {
    selectedTicket: { solutions, id, target },
  } = useSelector(collectionState);

  const { subHeading, solutionName, save } =
    appTextSource(appLang).console.editTicketScreen;

  const notSilly = yup.string().test(
    "no-bad-solutions", // Unique name for the test
    "The solution can't be silly", // Custom error message
    (value) =>
      !value ||
      (normalize(value) !== "" &&
        !(
          normalize(value).length <
          value.replace(/\s+/g, "").length - 2
        )),
  );

  const validationSchema = yup.object().shape({
    newSolutions1: notSilly.required("Required"),
    newSolutions2: notSilly,
    newSolutions3: notSilly,
    newSolutions4: notSilly,
    newSolutions5: notSilly,
    newSolutions6: notSilly,
    newSolutions7: notSilly,
    newSolutions8: notSilly,
  });

  const initialValues: FormValues = {
    newSolutions1: solutions[0] || "",
    newSolutions2: solutions[1] || "",
    newSolutions3: solutions[2] || "",
    newSolutions4: solutions[3] || "",
    newSolutions5: solutions[4] || "",
    newSolutions6: solutions[4] || "",
    newSolutions7: solutions[4] || "",
    newSolutions8: solutions[4] || "",
  };

  const saveTicket = useSaveTicket();

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    actions.setSubmitting(true);
    const newSolutions = Object.values(values).filter(
      (solution) => solution !== "",
    );
    await saveTicket(id, newSolutions);
    actions.setSubmitting(false);
  };

  return (
    <>
      <BottomShadow />
      <AuthFormContainer
        heading={target}
        subHeading={subHeading}
        nologo={true}
        popUp={true}
      >
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {() => (
            <>
              <ScrollView
                showsVerticalScrollIndicator={
                  Platform.OS !== "web"
                }
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
                        `newSolutions${index + 1}` as keyof FormValues
                      }
                      label={`${solutionName} ${index + 1}`}
                      placeholder=""
                      bottomMargin
                      autoCapitalize="none"
                    />
                  ),
                )}
              </ScrollView>
              <View
                style={{
                  padding: 30,
                  width: "100%",
                }}
              >
                <SubmitButton title={save} />
              </View>
              <View style={{ height: 150 }} />
            </>
          )}
        </Formik>
      </AuthFormContainer>
    </>
  );
};

export default EditTicketScreen;
