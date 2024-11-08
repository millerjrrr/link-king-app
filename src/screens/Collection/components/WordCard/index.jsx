import React, { useCallback } from "react";
import colors from "@src/utils/colors";
import { numberDateToWordStyleDate } from "@src/utils/numberDateToWordStyle";
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
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import SpeakButton from "./SpeakButton";

const WordCard = ({ navigation, ticket, onPress }) => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);
  const { CONTRAST, SECONDARY } = colors[colorScheme];

  const { tomorrow } = appTextSource(appLang).collection;

  const { target, rating, level } = ticket;
  const scale = 30;
  const fontSize =
    target.length > 10
      ? (scale * 10) / (10 + (target.length - 10) * 0.7)
      : scale;

  // Use useCallback to memoize onPress
  const goToWordInfoScreenForTicket = useCallback(() => {
    navigation.navigate("WordInfoScreen", { ticket });
  }, [navigation, ticket]);

  return (
    <Container
      color={CONTRAST[golden]}
      backgroundColor={SECONDARY}
    >
      <InfoContainer
        onPress={onPress || goToWordInfoScreenForTicket}
      >
        <RowContainer>
          <Title
            color={CONTRAST[golden]}
            fontSize={fontSize}
          >
            {target}
          </Title>
          <Rating color={CONTRAST[golden]}>
            {Math.round(rating)}
          </Rating>
        </RowContainer>
        <RowContainer>
          <WordCardLevelStars
            stars={level}
            target={target}
          />
          <Date color={CONTRAST[golden]}>
            {ticket.dueDate
              ? numberDateToWordStyleDate({
                  date: ticket.dueDate,
                  appLang,
                })
              : tomorrow}
          </Date>
        </RowContainer>
      </InfoContainer>
      <SpeakButton speakWord={target} />
    </Container>
  );
};

export default WordCard;
