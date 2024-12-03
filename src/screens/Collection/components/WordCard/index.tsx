import React, { useCallback } from "react";
import { numberDateToWordStyleDate } from "@src/utils/numberDateToWordStyle";
import { useSelector } from "react-redux";
import WordCardLevelStars from "./WordCardLevelStars";
import {
  Container,
  Date,
  InfoContainer,
  Padding,
  Rating,
  RowContainer,
  Title,
} from "./StyledComponents";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import SpeakButton from "./SpeakButton";
import useColors from "@src/hooks/useColors";

const WordCard = ({ navigation, ticket, onPress }: any) => {
  const { appLang } = useSelector(settingsState);
  const { CONTRAST, SECONDARY } = useColors();

  const { tomorrow } = appTextSource(appLang).collection;

  const { target, rating, level } = ticket;
  const scale = 30;
  const fontSize =
    target.length > 10
      ? (scale * 10) / (10 + (target.length - 10) * 0.7)
      : scale;

  // Use useCallback to memoize onPress
  const goToWordInfoScreenForTicket = useCallback(() => {
    navigation.navigate("Word Details", { ticket });
  }, [navigation, ticket]);

  return (
    <Padding>
      <Container
        color={CONTRAST}
        backgroundColor={SECONDARY}
      >
        <InfoContainer
          onPress={onPress || goToWordInfoScreenForTicket}
        >
          <RowContainer>
            <Title color={CONTRAST} fontSize={fontSize}>
              {target}
            </Title>
            <Rating color={CONTRAST}>
              {Math.round(rating)}
            </Rating>
          </RowContainer>
          <RowContainer>
            <WordCardLevelStars
              stars={level}
              target={target}
            />
            <Date color={CONTRAST}>
              {ticket.dueDate
                ? numberDateToWordStyleDate({
                    dateAsNumber: Number(ticket.dueDate),
                    appLang,
                  })
                : tomorrow}
            </Date>
          </RowContainer>
        </InfoContainer>
        <SpeakButton speakWord={target} />
      </Container>
    </Padding>
  );
};

export default WordCard;
