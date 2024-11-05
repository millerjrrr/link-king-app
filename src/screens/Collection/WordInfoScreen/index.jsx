import { Linking, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import PopUpContainer from "@src/components/containers/PopUpContainer";
import React from "react";
import BloodRedCover from "@src/components/BloodRedCover";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import ResponseInformation from "./ResponseInformation";
import appTextSource from "@src/utils/appTextSource";
import { settingsState } from "@src/store/settings";
import AcceptedAnswers from "./AcceptedAnswers";
import WordCard from "../WordCard";
import UserAttempt from "./UserAttempt";
import { consoleState } from "@src/store/console";
import SolutionsList from "@src/screens/Console/components/SolutionsList";
import DeleteButton from "./DeleteButton";
import { redCoverState } from "@src/store/redCover";
import { collectionState } from "@src/store/collection";

const WordInfoScreen = ({ route }) => {
  const { ticket, wrongAnswerReturned } = route.params;
  const { appLang } = useSelector(settingsState);
  const {
    attempt: { speechLang },
  } = useSelector(consoleState);
  const languageCode = speechLang.slice(0, 2);
  const url = `https://www.google.com/search?q=define+${ticket.target}&hl=${languageCode}`;
  const onPress = () => Linking.openURL(url);

  const { busy, wordDeleteButtonPressed } =
    useSelector(collectionState);
  const { elapsedTime, redCoverZIndex } =
    useSelector(redCoverState);

  const { heading } =
    appTextSource(appLang).console.targetDetails;

  return (
    <PopUpContainer {...{ heading, blockPopToTop: true }}>
      <BloodRedCover
        {...{ elapsedTime, coverZIndex: redCoverZIndex }}
      />
      <BusyWrapper {...{ busy, size: 96 }}>
        <View style={styles.container}>
          <View {...{ style: { height: 8 } }} />
          <WordCard {...{ ticket, onPress }} />
          <AcceptedAnswers />
          <SolutionsList {...{ ticket, plus: true }} />
          {wrongAnswerReturned ? <UserAttempt /> : null}
        </View>
        {wordDeleteButtonPressed ? (
          <ResponseInformation />
        ) : (
          <DeleteButton ticketId={ticket.id} />
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
