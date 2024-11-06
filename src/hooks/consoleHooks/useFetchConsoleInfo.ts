import {
  updateBusyState,
  updateConsoleState,
  updateLocals,
  updateShowSolution,
} from "@src/store/console";
import clientWithAuth from "@src/api/clientWithAuth";
import useCatchAsync from "@src/hooks/useCatchAsync";
import { useDispatch } from "react-redux";

const useFetchConsoleInfo = () => {
  const catchAsync = useCatchAsync();
  const dispatch = useDispatch();

  const fetchConsoleInfo = catchAsync(
    async (repeatRepeats: boolean = false) => {
      const url = repeatRepeats
        ? "/api/v1/console/repeat-repeats"
        : "/api/v1/console/send-game-state";
      try {
        dispatch(updateBusyState(true));
        dispatch(updateShowSolution(false));
        const { data } = await clientWithAuth.get(url);

        dispatch(updateConsoleState({ ...data }));
        dispatch(
          updateLocals({
            busy: false,
            golden: Number(data.stats.steps === 0),
          }),
        );
      } finally {
        dispatch(updateBusyState(false)); //important that this comes first
      }
    },
  );

  return fetchConsoleInfo;
};

export default useFetchConsoleInfo;
