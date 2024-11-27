import InnerTabContainer from "@src/components/Containers/InnerTabContainer";
import WordCollectionList from "./components/WordCollectionList";
import { useState } from "react";
import SearchBarContainer from "./components/SearchBarContainer";
import { useDispatch, useSelector } from "react-redux";
import { collectionState } from "@src/store/collection";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import appTextSource from "@src/utils/appTextSource";
import { settingsState } from "@src/store/settings";
import AppModal from "@src/components/AppModals";
import useFetchTickets from "@src/hooks/collectionHooks/useFetchTickets";
import {
  modalState,
  updateModals,
} from "@src/store/modals";

const Collection = ({ navigation }) => {
  const { tickets, busy } = useSelector(collectionState);
  const { appLang } = useSelector(settingsState);
  const { showCollectionInfoModal } =
    useSelector(modalState);
  const { heading } = appTextSource(appLang).collection;

  useFetchTickets();
  const dispatch = useDispatch();

  const help = () => {
    dispatch(
      updateModals({ showCollectionInfoModal: true }),
    );
  };

  const dictionarySettings = () => {
    navigation.navigate("Options");
    navigation.navigate("DictionarySelectionScreen");
  };

  const modalProps = {
    isVisible: showCollectionInfoModal,
    onBackdropPress: () =>
      dispatch(
        updateModals({ showCollectionInfoModal: false }),
      ),
    modalName: "collectionInfo",
    onPress: () =>
      dispatch(
        updateModals({ showCollectionInfoModal: false }),
      ),
    info: true,
  };

  return (
    <InnerTabContainer
      heading={heading}
      help={help}
      dictionarySettings={dictionarySettings}
    >
      <SearchBarContainer navigation={navigation} />
      <BusyWrapper busy={busy} size={96} pushToTop={true}>
        <WordCollectionList
          navigation={navigation}
          tickets={tickets}
        />
      </BusyWrapper>
      <AppModal {...modalProps} />
    </InnerTabContainer>
  );
};

export default Collection;
