import { Text, View, TouchableOpacity } from "react-native";
import PopUpContainer from "../components/containers/PopUpContainer";
import appTextContent from "../utils/appTextContent";
import styled from "styled-components";
import ScrollSelector from "./components/ScrollSelector";
import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import colors from "../utils/colors";

const Container = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
  padding-horizontal: 15px;
`;

const GoalContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Or = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  color: ${(props) => props.color};
  padding-top: 30px;
`;

const SubTitle = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

const Units = styled(Text)`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

const SetDailyGoalScreen = () => {
  const { title, textA, textB, textC, textD, textE } =
    appTextContent.english.options.setDailyGoal;

  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const restoreDefaultValues = () => {
    console.log("restoring");
  };

  return (
    <PopUpContainer heading={title}>
      <Container>
        <GoalContainer>
          <SubTitle {...{ color }}>{textA}</SubTitle>
          <ScrollSelector
            {...{
              onSelect: () => console.log("time"),
              length: 60,
              start: 10,
            }}
          />
          <Units {...{ color }}>mins</Units>
        </GoalContainer>
        <Or {...{ color }}>{textD}</Or>
        <GoalContainer>
          <SubTitle {...{ color }}>{textB}</SubTitle>
          <ScrollSelector
            {...{
              onSelect: () => console.log("new words"),
              length: 50,
              start: 1,
            }}
          />
        </GoalContainer>
        <Or {...{ color }}>{textD}</Or>
        <GoalContainer>
          <SubTitle {...{ color }}>{textC}</SubTitle>
          <ScrollSelector
            {...{
              onSelect: () => console.log("selected"),
              length: 500,
              start: 100,
            }}
          />
        </GoalContainer>
        <TouchableOpacity
          {...{
            onPress: restoreDefaultValues,
            style: { marginTop: 35 },
          }}
        >
          <Text
            style={{
              color: colors[colorScheme].INACTIVE_CONTRAST,
              fontSize: 18,
            }}
          >
            {textE}
          </Text>
        </TouchableOpacity>
      </Container>
    </PopUpContainer>
  );
};

export default SetDailyGoalScreen;
