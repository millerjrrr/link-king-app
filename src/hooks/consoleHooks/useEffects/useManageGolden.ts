import { useDispatch, useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import { useEffect } from "react";
// import { useNavigation } from "@react-navigation/native";
import {
  settingsState,
  updateSettings,
} from "@src/store/settings";
// import { ConsoleStackParamList } from "@src/types/navigationTypes";
// import { StackNavigationProp } from "@react-navigation/stack";

const useManageGolden = () => {
  const {
    stats,
    locals: { showSolution },
  } = useSelector(selectConsoleState);
  const { timeGoal, newWordsGoal, stepsGoal, golden } =
    useSelector(settingsState);
  const { steps, time, newWords } = stats;

  const dispatch = useDispatch();
  // const navigation =
  //   useNavigation<
  //     StackNavigationProp<ConsoleStackParamList>
  //   >();

  //goal management
  useEffect(() => {
    if (showSolution) {
      // const showResultsSummary = () => {
      //   navigation.navigate("Progress");
      // };

      const timeGoalMet =
        timeGoal !== 0 && time >= timeGoal * 60 * 1000;
      const newWordsGoalMet =
        newWordsGoal !== 0 && newWords >= newWordsGoal;
      const stepsGoalMet =
        stepsGoal !== 0 && steps >= stepsGoal;

      if (timeGoalMet || newWordsGoalMet || stepsGoalMet) {
        if (golden === 0) {
          // setTimeout(showResultsSummary, 1500);
          dispatch(updateSettings({ golden: 1 }));
        }
      } else dispatch(updateSettings({ golden: 0 }));
    }
  }, [showSolution]);
};

export default useManageGolden;
