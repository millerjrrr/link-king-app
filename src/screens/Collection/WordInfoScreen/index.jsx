import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PopUpContainer from "@src/components/Containers/PopUpContainer";
import React, { useCallback } from "react";
import BloodRedCover from "@src/components/BloodRedCover";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import ResponseInformation from "./ResponseInformation";
import appTextSource from "@src/utils/appTextSource";
import { settingsState } from "@src/store/settings";
import AcceptedAnswers from "./AcceptedAnswers";
import WordCard from "../components/WordCard";
import UserAttempt from "./UserAttempt";
import { selectConsoleState } from "@src/store/console";
import SolutionsList from "@src/screens/Console/components/SolutionsList";
import DeleteButton from "./DeleteButton";
import {
  collectionState,
  updateWordDeleteButtonPressed,
} from "@src/store/collection";
import { useFocusEffect } from "@react-navigation/native";
import {
  modalState,
  updateModals,
} from "@src/store/modals";
import AppModal from "@src/components/AppModal";

const WordInfoScreen = ({ route }) => {
  const { ticket, wrongAnswerReturned } = route.params;
  const { appLang } = useSelector(settingsState);
  const {
    gamePlay: { speechLang },
  } = useSelector(selectConsoleState);
  const definitionSearchLanguage = speechLang.slice(0, 2);
  const dispatch = useDispatch();

  const onPress = () =>
    dispatch(
      updateModals({
        showDefinitionInWebViewModal: true,
        definitionSearchWord: ticket.target,
        definitionSearchLanguage,
      }),
    );

  const { busy, wordDeleteButtonPressed } =
    useSelector(collectionState);

  const { heading } =
    appTextSource(appLang).console.targetDetails;

  useFocusEffect(
    useCallback(() => {
      // This code will run when the screen gains focus
      // (nothing here for your use case)

      // The cleanup function will run when the screen loses focus
      return () => {
        dispatch(updateWordDeleteButtonPressed(false));
      };
    }, [dispatch]),
  );

  const { showDefinitionInWebViewModal } =
    useSelector(modalState);

  const modalProps = {
    isVisible: showDefinitionInWebViewModal,
    webView: true,
    onBackdropPress: () => {
      dispatch(
        updateModals({
          showDefinitionInWebViewModal: false,
        }),
      );
    },
    info: true,
  };
  return (
    <PopUpContainer {...{ heading, blockPopToTop: true }}>
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
        <AppModal {...modalProps} />
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
