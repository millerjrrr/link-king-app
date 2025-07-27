import clientWithAuth from "@src/api/clientWithAuth";
import {
  restartTheTimer,
  incrementStatsTime,
  updateBusyState,
  updateLocals,
  updateConsoleState,
  selectConsoleLocals,
  updateFormValue,
} from "@src/store/console";
import { speak } from "@src/utils/appSpeak";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "../utilityHooks/useCatchAsync";
import usePlaySound from "./usePlaySound";

const useHandleCorrectAnswer = () => {
  const dispatch = useDispatch();
  const playSound = usePlaySound();
  const catchAsync = useCatchAsync();
  const {
    startedThisWord,
    options: { sound, bing },
  } = useSelector(selectConsoleLocals);

  const handleCorrectAnswer = catchAsync(async () => {
    if (bing) playSound("bing");
    //console.log("# Handling correct Answer");
    const time = Math.min(
      Date.now() - startedThisWord,
      10 * 1000,
    );
    if (time > 500) {
      try {
        dispatch(
          updateLocals({
            startedThisWord: Date.now(),
            timerIsOn: true, // the clock should still be running to count seconds playing the game
            busy: true,
            showSolution: false,
          }),
        );

        let { data } = await clientWithAuth.post(
          "/api/v1/console/submit-attempt",
          {
            correct: true,
            time,
          },
        );

        const {
          gamePlay: { target, speechLang: language },
        } = data;

        dispatch(updateConsoleState({ ...data }));
        dispatch(updateFormValue(""));
        speak({ target, language, sound });

        dispatch(restartTheTimer());
      } finally {
        dispatch(updateBusyState(false));
      }
    }
  });

  return handleCorrectAnswer;
};
export default useHandleCorrectAnswer;
