import {
  updateBusyState,
  updateConsoleState,
  updateLocals,
  updateShowSolution,
} from "@src/store/console";
import clientWithAuth from "@src/api/clientWithAuth";
import useCatchAsync from "@src/hooks/utilityHooks/useCatchAsync";
import { useDispatch } from "react-redux";

const useFetchConsoleInfo = () => {
  const catchAsync = useCatchAsync();
  const dispatch = useDispatch();

  const fetchConsoleInfo = catchAsync(
    async (repeatRepeats: boolean = false) => {
      //console.log("# Fetching console info");
      const url = repeatRepeats
        ? "/api/v1/console/repeat-repeats"
        : "/api/v1/console/send-game-state";
      try {
        dispatch(updateBusyState(true));
        dispatch(updateShowSolution(false));
        const {
          data: { dictionary, display, gamePlay, stats },
        } = await clientWithAuth.get(url);
        dispatch(
          updateConsoleState({
            dictionary,
            display,
            gamePlay,
            stats,
          }),
        );
        dispatch(
          updateLocals({
            busy: false,
            golden: Number(stats.steps === 0),
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
