import { useDispatch } from "react-redux";
import { getFromAsyncStorage } from "@src/utils/asyncStorage";
import { updateSettings } from "@src/store/settings";
import useCatchAsync from "@src/hooks/utilityHooks/useCatchAsync";
import getGoalFromStorage from "@src/utils/getGoalFromAsyncStorage";

const useFetchSettings = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();

  const fetchSettings = catchAsync(async () => {
    //console.log("# Fetching settings");
    const colorScheme = ((await getFromAsyncStorage(
      "color-scheme",
    )) || "dark") as
      | "dark"
      | "blue"
      | "green"
      | "orange"
      | "pink"
      | "light";

    const timeGoal = await getGoalFromStorage(
      "time-goal",
      3,
    );
    const newWordsGoal = await getGoalFromStorage(
      "new-words-goal",
      0,
    );
    const stepsGoal = await getGoalFromStorage(
      "steps-goal",
      100,
    );

    dispatch(
      updateSettings({
        colorScheme,
        timeGoal,
        newWordsGoal,
        stepsGoal,
      }),
    );
  });

  return fetchSettings;
};

export default useFetchSettings;
