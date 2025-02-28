import { updateDictionary } from "@src/store/console";
import clientWithAuth from "@src/api/clientWithAuth";
import useCatchAsync from "../utilityHooks/useCatchAsync";
import { useDispatch } from "react-redux";
import { updateBusyState } from "@src/store/auth";

const useSendDictionary = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();

  const sendDictionary = catchAsync(
    async (dictionary: string) => {
      //console.log("# Sending a dictionary");
      try {
        dispatch(updateBusyState(true));
        const { data } = await clientWithAuth.post(
          "/api/v1/users/change-dictionary",
          {
            dictionary,
          },
        );
        dispatch(updateDictionary(data.dictionary));
        dispatch(updateBusyState(false));
      } finally {
        dispatch(updateBusyState(false)); //important that this comes first
      }
    },
  );
  return sendDictionary;
};

export default useSendDictionary;
