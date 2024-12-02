import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { updateNotification } from "@src/store/notification";
import {
  settingsState,
  updateSettings,
} from "@src/store/settings";
import colors from "@src/utils/colors";
import appTextSource from "@src/utils/appTextSource";
import PopUpContainer from "@src/components/Containers/PopUpContainer";
import AppText from "@src/components/AppText";
import ScrollSelector from "./ScrollSelector";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { saveToAsyncStorage } from "@src/utils/asyncStorage";
import { updateModals } from "@src/store/modals";
import screenDimensions from "@src/utils/screenDimensions";

const Container = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;

const { width } = screenDimensions();

const GoalContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${width - 30}px;
`;

const Icon = ({ name, message, color }) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() =>
        dispatch(
          updateNotification({
            message,
            type: "info",
          }),
        )
      }
    >
      <MaterialCommunityIcons
        name={name}
        color={color}
        size={96}
      />
    </TouchableOpacity>
  );
};

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

  const updateTimeGoal = (value) => {
    saveToAsyncStorage("time-goal", value.toString());
    dispatch(updateSettings({ timeGoal: value }));
  };
  const updateNewWordsGoal = (value) => {
    saveToAsyncStorage("new-words-goal", value.toString());
    dispatch(updateSettings({ newWordsGoal: value }));
  };
  const updateStepsGoal = (value) => {
    saveToAsyncStorage("steps-goal", value.toString());
    dispatch(updateSettings({ stepsGoal: value }));
  };

  const help = () => {
    dispatch(
      updateModals({ modalShowing: "dailyGoalInfoModal" }),
    );
  };

  return (
    <PopUpContainer heading={heading} help={help}>
      <Container>
        <GoalContainer>
          <Icon
            name={"clock-outline"}
            message={textA}
            color={color}
          />
          <ScrollSelector
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
          <ScrollSelector
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
          <ScrollSelector
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
