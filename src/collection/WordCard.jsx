import React from "react";
import { StyleSheet, Platform } from "react-native";
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
import { getColorsState } from "../store/colors";

const WordCard = ({ navigation, ticket }) => {
  const { colorScheme, golden } =
    useSelector(getColorsState);
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
