import clientWithAuth from "@src/api/clientWithAuth";
import useCatchAsync from "@src/hooks/useCatchAsync";
import { useDispatch } from "react-redux";
import {
  updateBusy,
  updateWordDeleteButtonPressed,
} from "@src/store/collection";
import { updateRedCover } from "@src/store/redCover";

const useFlagAndDeleteTicket = () => {
  const catchAsync = useCatchAsync();
  const dispatch = useDispatch();

  const flagAndDeleteTicket = catchAsync(
    async (ticketId) => {
      //console.log("# flagging and deleting a word");
      dispatch(updateBusy(true));
      dispatch(updateWordDeleteButtonPressed(true));
      try {
        const { data } = await clientWithAuth.post(
          "/api/v1/collection/flag-word",
          {
            ticketId,
          },
        );
        dispatch(
          updateWordDeleteButtonPressed(
            data.status === "success",
          ),
        );
      } finally {
        dispatch(updateBusy(false));
        dispatch(updateRedCover({ elapsedTime: 0 }));
      }
    },
  );

  return flagAndDeleteTicket;
};

export default useFlagAndDeleteTicket;
