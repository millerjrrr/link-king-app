import { Linking, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PopUpContainer from "@src/components/containers/PopUpContainer";
import React, { useState } from "react";
import BloodRedCover from "@src/components/BloodRedCover";
import { flagAndDeleteTicket } from "@src/utils/collectionFunctions/flagAndDeleteTicket";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import ResponseInformation from "./ResponseInformation";
import NoticeAndFlagButton from "./NoticeAndFlagButton";
import appTextSource from "@src/utils/appTextSource";
import { getSettingsState } from "@src/store/settings";
import AcceptedAnswers from "./AcceptedAnswers";
import WordCard from "../WordCard";
import UserAttempt from "./UserAttempt";
import { getConsoleState } from "@src/store/console";
import SolutionsList from "@src/screens/Console/components/SolutionsList";

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
      ticket.id,
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
    <PopUpContainer {...{ heading, blockPopToTop: true }}>
      <BloodRedCover {...{ elapsedTime, coverZIndex }} />
      <BusyWrapper {...{ busy, size: 96 }}>
        <View style={styles.container}>
          <View {...{ style: { height: 8 } }} />
          <WordCard {...{ ticket, onPress }} />
          <AcceptedAnswers />
          <SolutionsList {...{ ticket, plus: true }} />
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
