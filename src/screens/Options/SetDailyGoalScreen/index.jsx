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
import PopUpContainer from "@src/components/containers/PopUpContainer";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import AppText from "@src/components/AppText";
import AppModal from "@src/components/AppModal";
import ScrollSelector from "./ScrollSelector";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { saveToAsyncStorage } from "@src/utils/asyncStorage";

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
        {...{
          name,
          color,
          size: 96,
        }}
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

  const [isModalVisible, setIsModalVisible] =
    useState(false);

  const [isModal2Visible, setIsModal2Visible] =
    useState(false);

  const [busy, setBusy] = useState(false);

  const restoreGoalDefaults = () => {
    dispatch(restoreDefaultGoals());
    setBusy(true);
    setTimeout(() => setBusy(false), 50);
    setIsModalVisible(false);
  };

  const help = () => {
    setIsModal2Visible(true);
  };

  return (
    <PopUpContainer {...{ heading, help }}>
      <BusyWrapper {...{ busy }}>
        <Container>
          <GoalContainer>
            <Icon
              {...{
                name: "clock-outline",
                message: textA,
                color,
              }}
            />
            <ScrollSelector
              {...{
                onSelect: updateTimeGoal,
                length: 60,
                start: timeGoal,
              }}
            />
          </GoalContainer>
          <GoalContainer>
            <Icon
              {...{
                name: "basket-fill",
                message: textB,
                color,
              }}
            />
            <ScrollSelector
              {...{
                onSelect: updateNewWordsGoal,
                length: 50,
                start: newWordsGoal,
              }}
            />
          </GoalContainer>
          <GoalContainer>
            <Icon
              {...{
                name: "foot-print",
                message: textC,
                color,
              }}
            />
            <ScrollSelector
              {...{
                onSelect: updateStepsGoal,
                length: 500,
                start: stepsGoal,
              }}
            />
          </GoalContainer>
          <TouchableOpacity
            {...{
              onPress: () => setIsModalVisible(true),
              style: { marginTop: 35 },
            }}
          >
            <AppText
              style={{
                color:
                  colors[colorScheme].INACTIVE_CONTRAST,
                fontSize: 18,
              }}
            >
              {textD}
            </AppText>
          </TouchableOpacity>
          <AppModal
            {...{
              isVisible: isModalVisible,
              onBackdropPress: () =>
                setIsModalVisible(false),
              modalName: "setDailyGoal",
              onPress: restoreGoalDefaults,
            }}
          />
          <AppModal
            {...{
              isVisible: isModal2Visible,
              onBackdropPress: () =>
                setIsModal2Visible(false),
              modalName: "dailyGoalInfo",
              onPress: () => setIsModal2Visible(false),
              info: true,
            }}
          />
        </Container>
      </BusyWrapper>
    </PopUpContainer>
  );
};

export default SetDailyGoalScreen;