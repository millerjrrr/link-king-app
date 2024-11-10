import clientWithAuth from "@src/api/clientWithAuth";
import {
  updateBusyState,
  resetTimer,
  resetTimeOnThisWord,
  incrementStatsTime,
  resetConsole,
  updateConsoleState,
  selectConsoleLocals,
} from "@src/store/console";
import { Vibration } from "react-native";
import { speak } from "@src/utils/appSpeak";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "@src/hooks/useCatchAsync";

const useHandleWrongAnswer = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const { showSolution, startedThisWord } = useSelector(
    selectConsoleLocals,
  );

  const handleWrongAnswer = catchAsync(async () => {
    console.log("# Handling wrong answer");
    try {
      Vibration.vibrate(500);
      dispatch(updateBusyState(true));
      const time = !showSolution
        ? Math.min(Date.now() - startedThisWord, 30 * 1000)
        : Math.min(Date.now() - startedThisWord, 10 * 1000);
      dispatch(resetTimeOnThisWord());
      dispatch(incrementStatsTime(time));
      let { data } = await clientWithAuth.post(
        "/api/v1/console/submit-attempt",
        {
          correct: false,
          time,
        },
      );

      const {
        gamePlay: { target, speechLang: language },
        options: { sound },
      } = data;
      dispatch(updateConsoleState({ ...data }));
      dispatch(resetTimer());
      speak({ target, language, sound });
      dispatch(resetConsole());
    } finally {
      dispatch(updateBusyState(false));
    }
  });
  return handleWrongAnswer;
};

export default useHandleWrongAnswer;
