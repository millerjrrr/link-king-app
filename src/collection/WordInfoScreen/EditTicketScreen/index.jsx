import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../../../store/settings";
import * as yup from "yup";
import AuthFormContainer from "../../../components/containers/AuthFormContainer";
import Form from "../../../components/form";
import AuthInputField from "../../../components/form/AuthInputField";
import SubmitBtn from "../../../components/form/SubmitBtn";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { normalize } from "./../../../console/functions/normalize";
import appTextSource from "../../../utils/appTextSource";
import { saveTicket } from "./saveTicket";
import { useNavigation } from "@react-navigation/native";

const EditTicketScreen = ({ route }) => {
  const { appLang } = useSelector(getSettingsState);
  const {
    ticket: { solutions, _id },
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
      _id,
      newSolutions,
      message,
      dispatch,
    });
    actions.setSubmitting(false);
    setTimeout(
      () => navigation.navigate("ConsoleStackScreen"),
      1000,
    );
  };

  return (
    <AuthFormContainer
      {...{
        heading: target,
        subHeading,
        nologo: true,
        popUp: true,
      }}
    >
      <Form
        {...{ onSubmit, initialValues, validationSchema }}
      >
        <>
          <ScrollView
            {...{
              showsScrollIndicator: true,
              contentContainerStyle: {
                padding: 5,
                paddingHorizontal: 30,
                alignItems: "center",
              },
            }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <AuthInputField
                {...{
                  name: `newSolutions${index + 1}`,
                  label: solutionName + " " + (index + 1),
                  placeholder: "",
                  containerStyle: { marginBottom: 10 },
                }}
              />
            ))}
          </ScrollView>
          <View
            style={{
              padding: 30,
              paddingVertical: 50,
              width: "100%",
            }}
          >
            <SubmitBtn {...{ title: save }} />
          </View>
          <View {...{ style: { height: 100 } }} />
        </>
      </Form>
    </AuthFormContainer>
  );
};

export default EditTicketScreen;
