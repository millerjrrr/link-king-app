import {
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PopUpContainer from "../../components/containers/PopUpContainer";
import React, { useState } from "react";
import BloodRedCover from "../../ui/BloodRedCover";
import { flagAndDeleteTicket } from "../../utils/flagAndDeleteTicket";
import BusyWrapper from "../../ui/Loader/BusyWrapper";
import SolutionsList from "../../console/SolutionsList";
import ResponseInformation from "./ResponseInformation";
import NoticeAndFlagButton from "./NoticeAndFlagButton";
import appTextSource from "../../utils/appTextSource";
import { getSettingsState } from "../../store/settings";
import AcceptedAnswers from "./AcceptedAnswers";
import WordCard from "../WordCard";
import UserAttempt from "./UserAttempt";
import { getConsoleState } from "../../store/console";

const WordInfoScreen = ({ route }) => {
  const { ticket, wrongAnswerReturned } = route.params;
  const { appLang } = useSelector(getSettingsState);
  const {
    attempt: { speechLang },
  } = useSelector(getConsoleState);
  const languageCode = speechLang.slice(0, 2);
  const url = `https://www.google.com/search?q=define+${ticket.target}&hl=${languageCode}`;
  const onPress = () => Linking.openURL(url);

  // ...loader management...
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [coverZIndex, setCoverZIndex] = useState(1);
  const [pressed, setPressed] = useState(false);

  const dispatch = useDispatch();
  const completeFunction = () => {
    flagAndDeleteTicket(
      ticket._id,
      setBusy,
      setStatus,
      setPressed,
      wrongAnswerReturned,
      dispatch,
    );
  };
  const { heading } =
    appTextSource(appLang).console.targetDetails;

  return (
    <PopUpContainer {...{ heading }}>
      <BloodRedCover {...{ elapsedTime, coverZIndex }} />
      <BusyWrapper {...{ busy, size: 96 }}>
        <View style={styles.container}>
          <View {...{ style: { height: 8 } }} />
          <WordCard {...{ ticket, onPress }} />
          <AcceptedAnswers />
          <SolutionsList {...{ ticket }} />
          {wrongAnswerReturned ? <UserAttempt /> : null}
        </View>
        {pressed ? (
          <ResponseInformation
            {...{ status, wrongAnswerReturned }}
          />
        ) : (
          <NoticeAndFlagButton
            {...{
              completeFunction,
              setElapsedTime,
              setCoverZIndex,
              wrongAnswerReturned,
            }}
          />
        )}
      </BusyWrapper>
    </PopUpContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    zIndex: 1,
  },
});

export default WordInfoScreen;
