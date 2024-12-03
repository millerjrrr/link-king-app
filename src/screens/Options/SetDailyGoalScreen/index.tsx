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

  const updateTimeGoal = (value: number) => {
    saveToAsyncStorage("time-goal", value.toString());
    dispatch(updateSettings({ timeGoal: value }));
  };
  const updateNewWordsGoal = (value: number) => {
    saveToAsyncStorage("new-words-goal", value.toString());
    dispatch(updateSettings({ newWordsGoal: value }));
  };
  const updateStepsGoal = (value: number) => {
    saveToAsyncStorage("steps-goal", value.toString());
    dispatch(updateSettings({ stepsGoal: value }));
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
