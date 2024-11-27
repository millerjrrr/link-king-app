import clientWithAuth from "@src/api/clientWithAuth";
import { useDispatch } from "react-redux";
import useCatchAsync from "@src/hooks/useCatchAsync";
import { updateBusy } from "@src/store/dictionaryLookup";
import { updateModals } from "@src/store/modals";

const useAddNewWord = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();

  const addNewWord = catchAsync(async (id: string) => {
    console.log("# Adding New Word");
    try {
      dispatch(updateBusy(true));
      const {
        data: { ticket },
      } = await clientWithAuth.post(
        "/api/v1/collection/new-ticket",
        { id },
      );
      dispatch(
        updateModals({
          showNewWordAddedModal: true,
          ticket,
        }),
      );
    } finally {
      dispatch(updateBusy(false));
    }
  });

  return addNewWord;
};

export default useAddNewWord;
