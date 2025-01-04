import { Platform, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  settingsState,
  updateSettings,
} from "@src/store/settings";
import colors from "@src/utils/colors";
import appTextSource from "@src/utils/appTextSource";
import PopUpContainer from "@src/components/Containers/PopUpContainer";
import AppText from "@src/components/AppText";
import ScrollSelector from "./ScrollSelector";
import { saveToAsyncStorage } from "@src/utils/asyncStorage";
import { updateModals } from "@src/store/modals";
import {
  Container,
  GoalContainer,
} from "./StyledComponents";
import Icon from "./Icon";
import DropdownSelector from "./DropdownSelector";
import { selectConsoleState } from "@src/store/console";

const SetDailyGoalScreen = ({}) => {
  const {
    colorScheme,
    golden,
    timeGoal,
    newWordsGoal,
    stepsGoal,
    appLang,
  } = useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const { heading, textA, textB, textC, textD } =
    appTextSource(appLang).options.setDailyGoal;

  const dispatch = useDispatch();

  const {
    stats: { steps, time, newWords },
  } = useSelector(selectConsoleState);

  let timeGoalMet =
    timeGoal !== 0 && time >= timeGoal * 60 * 1000;
  let newWordsGoalMet =
    newWordsGoal !== 0 && newWords >= newWordsGoal;
  let stepsGoalMet = stepsGoal !== 0 && steps >= stepsGoal;

  const updateTimeGoal = (value: number) => {
    saveToAsyncStorage("time-goal", value.toString());
    dispatch(updateSettings({ timeGoal: value }));
    timeGoalMet = value !== 0 && time >= value * 60 * 1000;
    if (timeGoalMet || newWordsGoalMet || stepsGoalMet)
      dispatch(updateSettings({ golden: 1 }));
    else dispatch(updateSettings({ golden: 0 }));
  };
  const updateNewWordsGoal = (value: number) => {
    saveToAsyncStorage("new-words-goal", value.toString());
    dispatch(updateSettings({ newWordsGoal: value }));
    newWordsGoalMet = value !== 0 && newWords >= value;
    if (timeGoalMet || newWordsGoalMet || stepsGoalMet)
      dispatch(updateSettings({ golden: 1 }));
    else dispatch(updateSettings({ golden: 0 }));
  };
  const updateStepsGoal = (value: number) => {
    saveToAsyncStorage("steps-goal", value.toString());
    dispatch(updateSettings({ stepsGoal: value }));
    stepsGoalMet = value !== 0 && steps >= value;
    if (timeGoalMet || newWordsGoalMet || stepsGoalMet)
      dispatch(updateSettings({ golden: 1 }));
    else dispatch(updateSettings({ golden: 0 }));
  };

  const help = () => {
    dispatch(
      updateModals({ modalShowing: "dailyGoalInfoModal" }),
    );
  };

  const Selector =
    Platform.OS === "web"
      ? DropdownSelector
      : ScrollSelector;

  return (
    <PopUpContainer heading={heading} help={help}>
      <Container>
        <GoalContainer>
          <Icon
            name={"clock-outline"}
            message={textA}
            color={color}
          />
          <Selector
            onSelect={updateTimeGoal}
            length={60}
            start={timeGoal}
          />
        </GoalContainer>
        <GoalContainer>
          <Icon
            name={"basket-fill"}
            message={textB}
            color={color}
          />
          <Selector
            onSelect={updateNewWordsGoal}
            length={50}
            start={newWordsGoal}
          />
        </GoalContainer>
        <GoalContainer>
          <Icon
            name={"foot-print"}
            message={textC}
            color={color}
          />
          <Selector
            onSelect={updateStepsGoal}
            length={500}
            start={stepsGoal}
          />
        </GoalContainer>
        <TouchableOpacity
          onPress={() =>
            dispatch(
              updateModals({
                modalShowing: "setDailyGoalModal",
              }),
            )
          }
          style={{ marginTop: 35 }}
        >
          <AppText
            style={{
              color: colors[colorScheme].INACTIVE_CONTRAST,
              fontSize: 18,
            }}
          >
            {textD}
          </AppText>
        </TouchableOpacity>
      </Container>
    </PopUpContainer>
  );
};

export default SetDailyGoalScreen;
