import InnerTabContainer from "../components/containers/InnerTabContainer";
import WordCollectionList from "../collection/WordCollectionList";
import { useEffect, useState } from "react";
import { fetchTickets } from "../collection/functions/fetchTickets";
import SearchBarContainer from "../collection/SearchBarContainer";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionState } from "../store/collection";
import { fetchTicketsFirstBatch } from "../collection/functions/fetchTicketsFirstBatch";
import BusyWrapper from "../ui/Loader/BusyWrapper";
import { getAuthState } from "../store/auth";
import appTextSource from "../utils/appTextSource";
import { getSettingsState } from "../store/settings";
import AppModal from "../ui/AppModal";

const Collection = ({ navigation }) => {
  const dispatch = useDispatch();
  const { searchKeyword, tickets, page, busy } =
    useSelector(getCollectionState);
  const { appLang } = useSelector(getSettingsState);
  const { refresh } = useSelector(getAuthState);

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
      <AppModal
        {...{
          isVisible: isModalVisible,
          onBackdropPress: () => setIsModalVisible(false),
          modalName: "collectionInfo",
          onPress: () => setIsModalVisible(false),
          info: true,
        }}
      />
    </InnerTabContainer>
  );
};

export default Collection;
