import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "../useCatchAsync";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp as SNP } from "@react-navigation/stack";
import { CollectionStackParamList } from "@src/types/navigationTypes";
import { CreateCustomTicketScreenFormValues } from "@src/types/FormTypes";
import clientWithAuth from "@src/api/clientWithAuth";
import { updateNotification } from "@src/store/notification";
import appTextSource from "@src/utils/appTextSource";
import { settingsState } from "@src/store/settings";
import { updateSearchKeyword } from "@src/store/collection";

const useCreateCustomTicket = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const navigation =
    useNavigation<SNP<CollectionStackParamList>>();
  const { appLang } = useSelector(settingsState);
  const { customTicketCreated: message } =
    appTextSource(appLang).collection
      .dictionaryLookupScreen;

  const createCustomTicket = catchAsync(
    async (values: CreateCustomTicketScreenFormValues) => {
      const filteredSolutions = Object.values(values)
        .filter((solution) => solution !== "")
        .slice(1);
      const results = {
        target: values.formTarget,
        solutions: filteredSolutions,
      };
      const { data } = await clientWithAuth.post(
        "/api/v1/collection/create-custom-ticket",
        results,
      );

      if (data.status === "success") {
        dispatch(updateSearchKeyword(data.ticket.target));
        navigation.navigate("Collection");
        setTimeout(
          () =>
            dispatch(
              updateNotification({
                message: message || "error",
                type: "info",
              }),
            ),
          300,
        );
      }
    },
  );
  return createCustomTicket;
};

export default useCreateCustomTicket;
