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
import SwiperWrapper from "./SwiperWrapper";
import SwipeInstructions from "./SwipeInstructions";
import useColors from "src/hooks/utilityHooks/useColors";
import Ticket from "@src/types/Ticket";
import ReadWordButton from "@src/screens/Console/components/ReadWordButton";

const NewWordAddedModal: React.FC<{
  inConsole?: boolean;
}> = ({ inConsole }) => {
  const { appLang } = useSelector(settingsState);
  const { PRIMARY, CONTRAST } = useColors();

  const { ticket: untypedTicket } = useSelector(modalState);

  if (Object.keys(untypedTicket).length === 0) return;
  const ticket = untypedTicket as Ticket;

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

  const swipeLeftFunction = () => {
    if (inConsole) {
      console.log("left");
    }

    x();
  };

  const swipeRightFunction = () => {
    x();
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
      <SwiperWrapper
        name="newWordAddedModal"
        closeFunction={x}
        swipeLeftFunction={swipeLeftFunction}
        swipeRightFunction={swipeRightFunction}
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
            {!inConsole ? (
              <WordCard
                ticket={ticket}
                onPress={showWordInfo}
              />
            ) : (
              <ReadWordButton speakWord={ticket.target} />
            )}
            <AcceptedAnswers />
            <SolutionsList
              ticket={ticket}
              edit={!inConsole}
            />
          </NewWordModalContainer>
        </ModalContainer>
        {inConsole && <SwipeInstructions />}
      </SwiperWrapper>
    </Modal>
  );
};

export default NewWordAddedModal;
