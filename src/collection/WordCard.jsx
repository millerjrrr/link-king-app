import React from "react";
import { StyleSheet, Platform } from "react-native";
import colors from "../utils/colors";
import { numberDateToWordStyleDate } from "./functions/numberDateToWordStyle";
import DeleteButton from "./DeleteButton";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import WordCardLevelStars from "./WordCardLevelStars";
import {
  Container,
  Date,
  InfoContainer,
  Rating,
  RowContainer,
  Title,
} from "./WordCardStyledComponents";

const WordCard = ({ navigation, ticket }) => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

  const {
    dicEntry: { target, rating },
    dueDate,
    level,
  } = ticket;
  // important to do it like this so we still have access
  // to ticket as a whole

  const onPress = () =>
    navigation.navigate("WordDetails", {
      ticket,
    });

  return (
    <Container {...{ color, style: styles.container }}>
      <InfoContainer>
        <RowContainer>
          <Title {...{ color }}>{target}</Title>
          <Rating {...{ color }}>{rating}</Rating>
        </RowContainer>
        <RowContainer>
          <WordCardLevelStars
            {...{ stars: level, target }}
          />
          <Date {...{ color }}>
            {numberDateToWordStyleDate(dueDate)}
          </Date>
        </RowContainer>
      </InfoContainer>
      <DeleteButton {...{ onPress }} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default WordCard;
