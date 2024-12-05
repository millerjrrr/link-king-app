import { Platform, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PopUpContainer from "@src/components/Containers/PopUpContainer";
import React, { useCallback } from "react";
import BloodRedCover from "@src/components/BloodRedCover";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import ResponseInformation from "./ResponseInformation";
import appTextSource from "@src/utils/appTextSource";
import { settingsState } from "@src/store/settings";
import AcceptedAnswers from "./AcceptedAnswers";
import UserAttempt from "./UserAttempt";
import { selectConsoleState } from "@src/store/console";
import SolutionsList from "@src/screens/Console/components/SolutionsList";
import DeleteButton from "./DeleteButton";
import {
  collectionState,
  updateWordDeleteButtonPressed,
} from "@src/store/collection";
import { useFocusEffect } from "@react-navigation/native";
import { updateModals } from "@src/store/modals";
import definitionWebLookup from "@src/utils/definitionWebLookup";
import WordCard from "../components/WordCard";

const WordInfoScreen = ({ route }) => {
  const { selectedTicket: ticket } =
    useSelector(collectionState);
  const { wrongAnswerReturned } = route.params;
  const { appLang } = useSelector(settingsState);
  const {
    gamePlay: { speechLang },
  } = useSelector(selectConsoleState);
  const definitionSearchLanguage = speechLang.slice(0, 2);
  const dispatch = useDispatch();

  const onPress = () => {
    Platform.OS === "web"
      ? definitionWebLookup(
          ticket.target,
          definitionSearchLanguage,
        )
      : dispatch(
          updateModals({
            modalShowing: "definitionInWebViewModal",
            definitionSearchWord: ticket.target,
            definitionSearchLanguage,
          }),
        );
  };

  const { busy, wordDeleteButtonPressed } =
    useSelector(collectionState);

  const { heading } =
    appTextSource(appLang).console.targetDetails;

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(updateWordDeleteButtonPressed(false));
      };
    }, [dispatch]),
  );

  return (
    <PopUpContainer {...{ heading }}>
      <BloodRedCover />
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
