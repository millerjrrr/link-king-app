import { CreateCustomTicketScreenFormValues } from "@src/types/FormTypes";
import useCatchAsync from "../useCatchAsync";
import { useDispatch } from "react-redux";
import { updateBusy } from "@src/store/collection";
import clientWithAuth from "@src/api/clientWithAuth";

const useUpdateSolutions = () => {
  const catchAsync = useCatchAsync();
  const dispatch = useDispatch();

  const updateSolutions = catchAsync(
    async (
      target: string,
      setFieldValue: <
        K extends keyof CreateCustomTicketScreenFormValues,
      >(
        field: K,
        value: CreateCustomTicketScreenFormValues[K],
        shouldValidate?: boolean,
      ) => void,
    ) => {
      try {
        dispatch(updateBusy(true));

        const { data } = await clientWithAuth.post(
          "/api/v1/collection/send-translations",
          { word: target },
        );

        const translations: string[] = data.translations;

        translations.forEach(
          (translation: string, index: number) => {
            // Since your form has keys 'solution1' to 'solution8', we add 1 to index
            const fieldName =
              `solution${index + 1}` as keyof CreateCustomTicketScreenFormValues;
            setFieldValue(fieldName, translation, false);
          },
        );
      } finally {
        dispatch(updateBusy(false));
      }
    },
  );

  return updateSolutions;
};

export default useUpdateSolutions;
