import colors from "@src/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import {
  ModalContainer,
  NewWordHeader,
  NewWordModalContainer,
  XBarContainer,
} from "./components/StyledCompontents";
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
import Modal from "react-native-modal";
import useColors from "@src/hooks/useColors";
import DefinitionInWebViewModal from "./DefinitionInWebViewModal";

const NewWordAddedModal = () => {
  const { appLang } = useSelector(settingsState);
  const { PRIMARY, CONTRAST } = useColors();

  const { ticket } = useSelector(modalState);
  const { wordAdded } =
    appTextSource(appLang).collection
      .dictionaryLookupScreen;

  const {
    gamePlay: { speechLang },
  } = useSelector(selectConsoleState);
  const definitionSearchLanguage = speechLang.slice(0, 2);

  const dispatch = useDispatch();

  const showWordInfo = () => {
    dispatch(
      updateModals({
        modalShowing: "definitionInWebViewModal",
        definitionSearchWord: ticket.target,
        definitionSearchLanguage,
      }),
    );
  };

  const x = () => {
    dispatch(
      updateModals({ showNewWordAddedModal: false }),
    );
  };

  const { showNewWordAddedModal } = useSelector(modalState);

  return (
    <Modal
      isVisible={showNewWordAddedModal}
      onBackdropPress={x}
      backdropColor={"transparent"}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ModalContainer
        backgroundColor={PRIMARY}
        color={CONTRAST}
      >
        <NewWordModalContainer>
          <XBarContainer onPress={x}>
            <AntDesign
              name="close"
              size={24}
              color={CONTRAST}
            />
          </XBarContainer>
          <NewWordHeader>{wordAdded}</NewWordHeader>
          <WordCard
            ticket={ticket}
            onPress={showWordInfo}
          />
          <AcceptedAnswers />
          <SolutionsList ticket={ticket} edit />
        </NewWordModalContainer>
      </ModalContainer>
      <DefinitionInWebViewModal />
    </Modal>
  );
};

export default NewWordAddedModal;
