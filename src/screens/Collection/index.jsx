import InnerTabContainer from "@src/components/containers/InnerTabContainer";
import WordCollectionList from "./WordCollectionList";
import { useEffect, useState } from "react";
import { fetchTickets } from "@src/utils/collectionFunctions/fetchTickets";
import SearchBarContainer from "./SearchBarContainer";
import { useDispatch, useSelector } from "react-redux";
import { collectionState } from "@src/store/collection";
import { fetchTicketsFirstBatch } from "@src/utils/collectionFunctions/fetchTicketsFirstBatch";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import { authState } from "@src/store/auth";
import appTextSource from "@src/utils/appTextSource";
import { settingsState } from "@src/store/settings";
import AppModal from "@src/components/AppModal";

const Collection = ({ navigation }) => {
  const dispatch = useDispatch();
  const { searchKeyword, tickets, page, busy } =
    useSelector(collectionState);
  const { appLang } = useSelector(settingsState);
  const { refresh } = useSelector(authState);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        fetchTicketsFirstBatch(dispatch, []);
      },
    );
    return unsubscribe;
  }, [navigation, refresh]);

  useEffect(() => {
    if (page > 1)
      fetchTickets(dispatch, searchKeyword, tickets, page);
  }, [page]);

  useEffect(() => {
    fetchTicketsFirstBatch(dispatch, searchKeyword);
  }, [searchKeyword]);

  const { heading } = appTextSource(appLang).collection;

  const [isModalVisible, setIsModalVisible] =
    useState(false);

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
      <BusyWrapper {...{ busy, size: 96 }}>
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
