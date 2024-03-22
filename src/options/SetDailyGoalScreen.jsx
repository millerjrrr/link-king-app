import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import PopUpContainer from "../components/containers/PopUpContainer";
import styled from "styled-components";
import ScrollSelector from "./components/ScrollSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  getSettingsState,
  restoreDefaultGoals,
  updateSettings,
} from "../store/settings";
import colors from "../utils/colors";
import { saveToAsyncStorage } from "../utils/asyncStorage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { updateNotification } from "../store/notification";
import appTextSource from "../utils/appTextSource";

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

const SetDailyGoalScreen = ({ navigation }) => {
  const {
    colorScheme,
    golden,
    timeGoal,
    newWordsGoal,
    stepsGoal,
    appLang,
  } = useSelector(getSettingsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const { title, textA, textB, textC, textD } =
    appTextSource[appLang].options.setDailyGoal;

  const dispatch = useDispatch();

  const updateTimeGoal = (value) => {
    saveToAsyncStorage("time-goal", value + "");
    dispatch(updateSettings({ timeGoal: value }));
  };
  const updateNewWordsGoal = (value) => {
    saveToAsyncStorage("new-words-goal", value + "");
    dispatch(updateSettings({ newWordsGoal: value }));
  };
  const updateStepsGoal = (value) => {
    saveToAsyncStorage("steps-goal", value + "");
    dispatch(updateSettings({ stepsGoal: value }));
  };

  const restoreGoalDefaults = () => {
    dispatch(restoreDefaultGoals());
    navigation.goBack();
  };

  return (
    <PopUpContainer heading={title}>
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
              start: timeGoal === "" ? 0 : timeGoal,
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
              start: newWordsGoal === "" ? 0 : newWordsGoal,
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
              start: stepsGoal === "" ? 0 : stepsGoal,
            }}
          />
        </GoalContainer>
        <TouchableOpacity
          {...{
            onPress: restoreGoalDefaults,
            style: { marginTop: 35 },
          }}
        >
          <Text
            style={{
              color: colors[colorScheme].INACTIVE_CONTRAST,
              fontSize: 18,
            }}
          >
            {textD}
          </Text>
        </TouchableOpacity>
      </Container>
    </PopUpContainer>
  );
};

export default SetDailyGoalScreen;
