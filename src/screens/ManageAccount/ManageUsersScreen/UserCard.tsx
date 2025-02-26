import { useSelector } from "react-redux";
import {
  dateToNumberStyleDate,
  numberDateToDashFormat,
  numberDateToWordStyleDate,
} from "./../../../utils/numberDateToWordStyle";
import {
  Container,
  LastPlayed,
  Email,
  Name,
  Padding,
  Rating,
  RowContainer,
  TimePlayed,
  WordsCollected,
} from "./styledComponents";
import { settingsState } from "@src/store/settings";
import useColors from "@src/hooks/utilityHooks/useColors";
import { timeInStyle } from "@src/utils/timeInStyle";

interface User {
  username: string;
  email: string;
  lastPlayed: number;
  timePlayingLifetime: number;
  collectedWords: number;
  rating: number;
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const {
    username,
    email,
    lastPlayed,
    timePlayingLifetime,
    collectedWords,
    rating,
  } = user;
  const { appLang } = useSelector(settingsState);

  const scale = 30;
  const usernameFontSize =
    username.length > 10
      ? (scale * 10) / (10 + (username.length - 10) * 0.7)
      : scale;
  const emailFontSize =
    email.length > 10
      ? (scale * 10) / (10 + (email.length - 10) * 0.7)
      : scale;

  const { SECONDARY, GREEN, ORANGE, RED } = useColors();

  const today = dateToNumberStyleDate(Date.now());

  const color =
    lastPlayed === today || lastPlayed === today - 1
      ? GREEN
      : lastPlayed > today - 7
        ? ORANGE
        : RED;

  return (
    <Container backgroundColor={SECONDARY} color={color}>
      <Padding>
        <RowContainer>
          <Name color={color} fontSize={usernameFontSize}>
            {username}
          </Name>
          <LastPlayed color={color}>
            {numberDateToDashFormat(lastPlayed)}
          </LastPlayed>
        </RowContainer>
        <RowContainer>
          <Email color={color} fontSize={emailFontSize}>
            {" " + email}
          </Email>
          <TimePlayed color={color}>
            {timeInStyle(timePlayingLifetime)}
          </TimePlayed>
        </RowContainer>
        <RowContainer>
          <Rating color={color}>
            {" " + Math.round(rating)}
          </Rating>
          <WordsCollected color={color}>
            {collectedWords}
          </WordsCollected>
        </RowContainer>
      </Padding>
    </Container>
  );
};

export default UserCard;
