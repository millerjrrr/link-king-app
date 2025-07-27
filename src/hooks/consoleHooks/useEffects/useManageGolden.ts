import { useDispatch, useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import { useEffect } from "react";
import {
  settingsState,
  updateSettings,
} from "@src/store/settings";

const useManageGolden = () => {
  const {
    stats,
    gamePlay: { target },
  } = useSelector(selectConsoleState);
  const { timeGoal, newWordsGoal, stepsGoal, golden } =
    useSelector(settingsState);
  const { steps, time, newWords } = stats;

  const dispatch = useDispatch();

  useEffect(() => {
    const timeGoalMet =
      timeGoal !== 0 && time >= timeGoal * 60 * 1000;
    const newWordsGoalMet =
      newWordsGoal !== 0 && newWords >= newWordsGoal;
    const stepsGoalMet =
      stepsGoal !== 0 && steps >= stepsGoal;

    if (timeGoalMet || newWordsGoalMet || stepsGoalMet) {
      if (golden === 0) {
        dispatch(updateSettings({ golden: 1 }));
      }
    } else dispatch(updateSettings({ golden: 0 }));
  }, [target, timeGoal, newWordsGoal, stepsGoal, golden]);
};

export default useManageGolden;
