import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateNotification } from "@src/store/notification";
import {
  settingsState,
  restoreDefaultGoals,
  updateSettings,
} from "@src/store/settings";
import colors from "@src/utils/colors";
import appTextSource from "@src/utils/appTextSource";
import PopUpContainer from "@src/components/Containers/PopUpContainer";
import AppText from "@src/components/AppText";
import AppModal from "@src/components/AppModal";
import ScrollSelector from "./ScrollSelector";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { saveToAsyncStorage } from "@src/utils/asyncStorage";
import {
  modalState,
  updateModals,
} from "@src/store/modals";
import { updateBusyState } from "@src/store/auth";

const Container = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;

const { width } = Dimensions.get("window");

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

  const { showSetDailyGoalModal, showDailyGoalInfoModal } =
    useSelector(modalState);

  const restoreGoalDefaults = () => {
    dispatch(updateBusyState(true));
    setTimeout(() => dispatch(updateBusyState(false)), 5);
    dispatch(
      updateModals({ showSetDailyGoalModal: false }),
    );
    dispatch(restoreDefaultGoals());
  };

  const help = () => {
    dispatch(
      updateModals({ showDailyGoalInfoModal: true }),
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
              updateModals({ showSetDailyGoalModal: true }),
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
        <AppModal
          isVisible={showSetDailyGoalModal}
          onBackdropPress={() =>
            dispatch(
              updateModals({
                showSetDailyGoalModal: false,
              }),
            )
          }
          modalName={"setDailyGoal"}
          onPress={restoreGoalDefaults}
        />
        <AppModal
          isVisible={showDailyGoalInfoModal}
          onBackdropPress={() =>
            dispatch(
              updateModals({
                showDailyGoalInfoModal: false,
              }),
            )
          }
          modalName={"dailyGoalInfo"}
          onPress={() =>
            dispatch(
              updateModals({
                showDailyGoalInfoModal: false,
              }),
            )
          }
          info={true}
        />
      </Container>
    </PopUpContainer>
  );
};

export default SetDailyGoalScreen;
