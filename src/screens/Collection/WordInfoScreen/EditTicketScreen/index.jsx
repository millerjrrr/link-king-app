import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import * as yup from "yup";
import AuthFormContainer from "../../../../components/Containers/AuthFormContainer";
import AuthInputField from "../../../../components/AuthInputField";
import SubmitButton from "../../../../components/Buttons/SubmitButton";
import { Platform, ScrollView } from "react-native";
import { View } from "react-native";
import { normalize } from "@src/utils/normalize";
import appTextSource from "@src/utils/appTextSource";
import { saveTicket } from "./saveTicket";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import BottomShadow from "@src/components/BottomShadow";

const EditTicketScreen = ({ route }) => {
  const { appLang } = useSelector(settingsState);
  const {
    ticket: { solutions, id },
    target,
  } = route.params;
  const { subHeading, solutionName, save, message } =
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
        )), // Validation logic
  );

  const validationSchema = yup.object({
    newSolutions1: notSilly.required("required"),
    newSolutions2: notSilly,
    newSolutions3: notSilly,
    newSolutions4: notSilly,
    newSolutions5: notSilly,
  });

  const initialValues = {
    newSolutions1: solutions[0],
    newSolutions2: solutions[1] || "",
    newSolutions3: solutions[2] || "",
    newSolutions4: solutions[3] || "",
    newSolutions5: solutions[4] || "",
  };

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    const newSolutions = [...Object.values(values)].filter(
      (solution) => solution !== "",
    );
    await saveTicket({
      id,
      newSolutions,
      message,
      dispatch,
    });
    actions.setSubmitting(false);
  };

  return (
    <>
      <BottomShadow />
      <AuthFormContainer
        {...{
          heading: target,
          subHeading,
          nologo: true,
          popUp: true,
        }}
      >
        <Formik
          {...{ onSubmit, initialValues, validationSchema }}
        >
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
              {Array.from({ length: 5 }).map((_, index) => (
                <AuthInputField
                  key={index}
                  name={`newSolutions${index + 1}`}
                  label={solutionName + " " + (index + 1)}
                  placeholder=""
                  bottomMargin
                  autoCapitalize={false}
                />
              ))}
            </ScrollView>
            <View
              style={{
                padding: 30,
                width: "100%",
              }}
            >
              <SubmitButton {...{ title: save }} />
            </View>
            <View {...{ style: { height: 150 } }} />
          </>
        </Formik>
      </AuthFormContainer>
    </>
  );
};

export default EditTicketScreen;
