import clientWithAuth from "@src/api/clientWithAuth";
import useCatchAsync from "@src/hooks/useCatchAsync";
import { useDispatch } from "react-redux";
import { updateCollection } from "@src/store/collection";
import { updateRedCover } from "@src/store/redCover";

const useFlagAndDeleteTicket = () => {
  const catchAsync = useCatchAsync();
  const dispatch = useDispatch();

  const flagAndDeleteTicket = catchAsync(
    async (ticketId) => {
      dispatch(
        updateCollection({
          busy: true,
          wordDeleteButtonPressed: true,
        }),
      );
      try {
        const { data } = await clientWithAuth.post(
          "/api/v1/collection/flag-word",
          {
            ticketId,
          },
        );
        dispatch(
          updateCollection({
            wordDeletedSuccessfully:
              data.status === "success",
          }),
        );
      } finally {
        dispatch(
          updateCollection({
            busy: false,
          }),
        );
        dispatch(updateRedCover({ elapsedTime: 0 }));
      }
    },
  );

  return flagAndDeleteTicket;
};

export default useFlagAndDeleteTicket;
