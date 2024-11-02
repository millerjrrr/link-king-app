import React from "react";
import { StyleSheet } from "react-native";
import colors from "@src/utils/colors";
import { numberDateToWordStyleDate } from "../functions/numberDateToWordStyle";
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
import { getSettingsState } from "@src/store/settings";
import appShadow from "@src/utils/appShadow";
import appTextSource from "@src/utils/appTextSource";
import SpeakButton from "./SpeakButton";

const WordCard = ({
  navigation,
  ticket,
  onPress = () =>
    navigation.navigate("WordInfoScreen", {
      ticket,
    }),
}) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const { CONTRAST, SECONDARY } = colors[colorScheme];
  const color = CONTRAST[golden];
  const backgroundColor = SECONDARY;

  const { tomorrow } = appTextSource(appLang).collection;

  const { target, rating, level } = ticket;

  let fontSize = 30;
  const length = target.length;
  if (length > 10)
    fontSize = (fontSize * 10) / (10 + (length - 10) * 0.7);

  return (
    <Container
      {...{
        color,
        backgroundColor,
        style: styles.container,
      }}
    >
      <InfoContainer {...{ onPress }}>
        <RowContainer>
          <Title {...{ color, fontSize }}>{target}</Title>
          <Rating {...{ color }}>
            {Math.round(rating)}
          </Rating>
        </RowContainer>
        <RowContainer>
          <WordCardLevelStars
            {...{ stars: level, target }}
          />
          <Date {...{ color }}>
            {ticket.dueDate
              ? numberDateToWordStyleDate({
                  date: ticket.dueDate,
                  appLang,
                })
              : tomorrow}
          </Date>
        </RowContainer>
      </InfoContainer>
      <SpeakButton
        {...{
          speakWord: target,
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appShadow(1),
  },
});

export default WordCard;
