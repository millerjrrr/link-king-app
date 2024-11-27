import colors from "@src/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import {
  NewWordHeader,
  NewWordModalContainer,
  XBarContainer,
} from "./StyledCompontents";
import { AntDesign } from "@expo/vector-icons";
import WordCard from "@src/screens/Collection/components/WordCard";
import React from "react";
import SolutionsList from "@src/screens/Console/components/SolutionsList";
import {
  modalState,
  updateModals,
} from "@src/store/modals";
import AcceptedAnswers from "@src/screens/Collection/WordInfoScreen/AcceptedAnswers";
import { selectConsoleState } from "@src/store/console";
import appTextSource from "@src/utils/appTextSource";
import AppModal from ".";

const NewWordAddedModal = ({ x }) => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  const { showDefinitionInWebViewModal, ticket } =
    useSelector(modalState);
  const { newWordAdded } =
    appTextSource(appLang).collection
      .dictionaryLookupScreen;

  const {
    gamePlay: { speechLang },
  } = useSelector(selectConsoleState);
  const definitionSearchLanguage = speechLang.slice(0, 2);

  const dispatch = useDispatch();

  const onPress = () => {
    console.log("pressed");
    dispatch(
      updateModals({
        showDefinitionInWebViewModal: true,
        definitionSearchWord: ticket.target,
        definitionSearchLanguage,
      }),
    );
  };

  return (
    <NewWordModalContainer>
      <XBarContainer onPress={x}>
        <AntDesign name="close" size={24} color={color} />
      </XBarContainer>
      <NewWordHeader>{newWordAdded}</NewWordHeader>
      <WordCard {...{ ticket, onPress }} />
      <AcceptedAnswers />
      <SolutionsList {...{ ticket }} />
      <AppModal
        {...{
          isVisible: showDefinitionInWebViewModal,
          onBackdropPress: () => {
            dispatch(
              updateModals({
                showDefinitionInWebViewModal: false,
              }),
            );
          },
          webView: true,
          info: true,
        }}
      />
    </NewWordModalContainer>
  );
};

export default NewWordAddedModal;
