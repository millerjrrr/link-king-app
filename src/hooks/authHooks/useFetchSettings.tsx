import { useDispatch } from "react-redux";
import colors from "@src/utils/colors";
import { getFromAsyncStorage } from "@src/utils/asyncStorage";
import { updateSettings } from "@src/store/settings";
import { StatusBar } from "react-native";
import useCatchAsync from "@src/hooks/useCatchAsync";
import getGoalFromStorage from "@src/utils/getGoalFromAsyncStorage";

const useFetchSettings = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();

  const fetchSettings = catchAsync(async () => {
    const colorScheme: string =
      (await getFromAsyncStorage("color-scheme")) || "dark";
    const { STATUSBAR } =
      colors[colorScheme as keyof typeof colors];
    StatusBar.setBarStyle(STATUSBAR);

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

    const settings = {
      colorScheme,
      timeGoal,
      newWordsGoal,
      stepsGoal,
    };

    Object.keys(settings).forEach((key) => {
      const typedKey = key as keyof typeof settings;

      if (settings[typedKey]) {
        dispatch(
          updateSettings({ [key]: settings[typedKey] }),
        );
      }
    });
  });

  return fetchSettings;
};

export default useFetchSettings;
