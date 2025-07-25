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
  updateShowSolution,
} from "@src/store/console";
import { Keyboard, Vibration } from "react-native";
import { speak } from "@src/utils/appSpeak";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "@src/hooks/utilityHooks/useCatchAsync";
import { updateModals } from "@src/store/modals";
import usePlaySound from "./usePlaySound";

const useHandleWrongAnswer = () => {
  const dispatch = useDispatch();
  const playSound = usePlaySound();
  const catchAsync = useCatchAsync();
  const {
    startedThisWord,
    options: { sound, bing },
  } = useSelector(selectConsoleLocals);

  const handleWrongAnswer = catchAsync(async () => {
    //console.log("# Handling wrong answer");
    if (bing) playSound("buzz");
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

        const { gamePlay, isNewWord } = data;
        const {
          speechLang: language,
          tries,
          ...ticket
        } = gamePlay;

        // ✅ Check for newDicWord
        if (isNewWord) {
          () => Keyboard.dismiss();
          dispatch(updateModals({ ticket }));
          dispatch(
            updateModals({ showNewWordAddedModal: true }),
          );
        }

        dispatch(updateConsoleState({ ...data }));
        dispatch(resetTimer());
        dispatch(updateFormValue(""));

        speak({ target: ticket.target, language, sound });

        dispatch(resetConsole());
        dispatch(updateShowSolution(!isNewWord));
      } finally {
        dispatch(updateBusyState(false));
      }
    }
  });
  return handleWrongAnswer;
};

export default useHandleWrongAnswer;
