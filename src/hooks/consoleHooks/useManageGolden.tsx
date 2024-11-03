import { useDispatch, useSelector } from "react-redux";
import { getConsoleState } from "@src/store/console";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  getSettingsState,
  updateSettings,
} from "@src/store/settings";

const useManageGolden = () => {
  const { stats, showSolution } =
    useSelector(getConsoleState);
  const { timeGoal, newWordsGoal, stepsGoal, golden } =
    useSelector(getSettingsState);
  const { steps, time, newWords } = stats;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  //goal management
  return useEffect(() => {
    if (showSolution) {
      const showResultsSummary = () => {
        navigation.navigate("ProgressScreen");
      };

      const timeGoalMet =
        timeGoal !== 0 && time >= timeGoal * 60 * 1000;
      const newWordsGoalMet =
        newWordsGoal !== 0 && newWords >= newWordsGoal;
      const stepsGoalMet =
        stepsGoal !== 0 && steps >= stepsGoal;

      if (timeGoalMet || newWordsGoalMet || stepsGoalMet) {
        if (golden === 0) {
          setTimeout(showResultsSummary, 1500);
          dispatch(updateSettings({ golden: 1 }));
        }
      } else dispatch(updateSettings({ golden: 0 }));
    }
  }, [showSolution]);
};

export default useManageGolden;
