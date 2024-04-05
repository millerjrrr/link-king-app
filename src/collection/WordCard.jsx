import React from "react";
import { StyleSheet } from "react-native";
import colors from "../utils/colors";
import { numberDateToWordStyleDate } from "./functions/numberDateToWordStyle";
import DeleteButton from "./DeleteButton";
import { useSelector } from "react-redux";
import WordCardLevelStars from "./WordCardLevelStars";
import {
  Container,
  Date,
  InfoContainer,
  Rating,
  RowContainer,
  Title,
} from "./WordCardStyledComponents";
import { getSettingsState } from "../store/settings";
import appShadow from "../utils/appShadow";

const WordCard = ({ navigation, ticket }) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const { CONTRAST, SECONDARY } = colors[colorScheme];
  const color = CONTRAST[golden];
  const backgroundColor = SECONDARY;

  const {
    dicEntry: { target, rating },
    dueDate,
    level,
  } = ticket;
  // important to do it like this so we still have access
  // to ticket as a whole

  const onPress = () =>
    navigation.navigate("DeleteScreen", {
      ticket,
    });

  let fontSize = 30;
  const length = target.length;
  if (length > 15) fontSize = (fontSize * 15) / length;

  return (
    <Container
      {...{
        color,
        backgroundColor,
        style: styles.container,
      }}
    >
      <InfoContainer>
        <RowContainer>
          <Title {...{ color, fontSize }}>{target}</Title>
          <Rating {...{ color }}>
            {Math.round(rating * 10) / 10}
          </Rating>
        </RowContainer>
        <RowContainer>
          <WordCardLevelStars
            {...{ stars: level, target }}
          />
          <Date {...{ color }}>
            {numberDateToWordStyleDate({
              date: dueDate,
              appLang,
            })}
          </Date>
        </RowContainer>
      </InfoContainer>
      <DeleteButton {...{ onPress }} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appShadow(1),
  },
});

export default WordCard;
