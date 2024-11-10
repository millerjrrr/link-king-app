import { useDispatch } from "react-redux";
import useCatchAsync from "../useCatchAsync";
import { updateOptions } from "@src/store/console";
import clientWithAuth from "@src/api/clientWithAuth";

const useSendOptions = () => {
  const catchAsync = useCatchAsync();
  const dispatch = useDispatch();

  const sendOptions = catchAsync(
    async (options: {
      sound?: boolean;
      blurred?: boolean;
      timer?: boolean;
    }) => {
      console.log("# Sending options");
      const { data } = await clientWithAuth.post(
        "/api/v1/console/update-game-settings",
        options,
      );
      dispatch(updateOptions(data.options));
    },
  );

  return sendOptions;
};

export default useSendOptions;
