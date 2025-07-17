import clientWithAuth from "@src/api/clientWithAuth";
import {
  updateBusyState,
  resetTimer,
  resetTimeOnThisWord,
  incrementStatsTime,
  resetConsole,
  updateConsoleState,
  selectConsoleLocals,
  updateFormValue,
} from "@src/store/console";
import { Vibration } from "react-native";
import { speak } from "@src/utils/appSpeak";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "@src/hooks/utilityHooks/useCatchAsync";

const useHandleWrongAnswer = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const {
    startedThisWord,
    options: { sound },
  } = useSelector(selectConsoleLocals);

  const handleWrongAnswer = catchAsync(async () => {
    //console.log("# Handling wrong answer");
    const time = Math.min(
      Date.now() - startedThisWord,
      10 * 1000,
    );
    if (time > 500) {
      try {
        Vibration.vibrate(500);
        dispatch(updateBusyState(true));
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
        } = data;
        dispatch(updateConsoleState({ ...data }));
        dispatch(resetTimer());
        dispatch(updateFormValue(""));
        speak({ target, language, sound });
        dispatch(resetConsole());
      } finally {
        dispatch(updateBusyState(false));
      }
    }
  });
  return handleWrongAnswer;
};

export default useHandleWrongAnswer;
