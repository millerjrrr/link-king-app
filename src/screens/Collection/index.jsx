import InnerTabContainer from "@src/components/containers/InnerTabContainer";
import WordCollectionList from "./WordCollectionList";
import { useState } from "react";
import SearchBarContainer from "./SearchBarContainer";
import { useSelector } from "react-redux";
import { collectionState } from "@src/store/collection";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import appTextSource from "@src/utils/appTextSource";
import { settingsState } from "@src/store/settings";
import AppModal from "@src/components/AppModal";
import useFetchTickets from "@src/hooks/collectionHooks/useFetchTickets";

const Collection = ({ navigation }) => {
  const { tickets, busy } = useSelector(collectionState);
  const { appLang } = useSelector(settingsState);
  const { heading } = appTextSource(appLang).collection;
  const [isModalVisible, setIsModalVisible] =
    useState(false);

  useFetchTickets();

  const help = () => {
    setIsModalVisible(true);
  };

  const dictionarySettings = () => {
    navigation.navigate("Options");
    navigation.navigate("DictionarySelectionScreen");
  };

  const modalProps = {
    isVisible: isModalVisible,
    onBackdropPress: () => setIsModalVisible(false),
    modalName: "collectionInfo",
    onPress: () => setIsModalVisible(false),
    info: true,
  };

  return (
    <InnerTabContainer
      {...{ heading, help, dictionarySettings }}
    >
      <SearchBarContainer navigation={navigation} />
      <BusyWrapper {...{ busy, size: 96, pushToTop: true }}>
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
