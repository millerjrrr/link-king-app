import clientWithAuth from "@src/api/clientWithAuth";
import {
  restartTheTimer,
  incrementStatsTime,
  updateBusyState,
  updateLocals,
  updateConsoleState,
  selectConsoleLocals,
} from "@src/store/console";
import { speak } from "@src/utils/appSpeak";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "../useCatchAsync";

const useHandleCorrectAnswer = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const { showSolution, startedThisWord } = useSelector(
    selectConsoleLocals,
  );

  const handleCorrectAnswer = catchAsync(async () => {
    console.log("# Handling correct Answer");
    try {
      dispatch(
        updateLocals({
          timeOnThisWord: 0, // the clock is reset to zero, and starts counting the next timeOnThisWord to be sent to the server
          startedThisWord: Date.now(),
          timerIsOn: true, // the clock should still be running to count seconds playing the game
          busy: true,
          showSolution: false,
          formValue: "",
        }),
      );

      const time = !showSolution
        ? Math.min(Date.now() - startedThisWord, 30 * 1000)
        : Math.min(Date.now() - startedThisWord, 10 * 1000);

      dispatch(incrementStatsTime(time));
      let { data } = await clientWithAuth.post(
        "/api/v1/console/submit-attempt",
        {
          correct: true,
          time,
        },
      );

      const {
        gamePlay: { target, speechLang: language },
        options: { sound },
      } = data;

      dispatch(updateConsoleState({ ...data }));
      dispatch(updateBusyState(false));
      speak({ target, language, sound });
      dispatch(restartTheTimer());
    } finally {
      dispatch(updateBusyState(false));
    }
  });

  return handleCorrectAnswer;
};
export default useHandleCorrectAnswer;
