import InnerTabContainer from "../components/containers/InnerTabContainer";
import WordCollectionList from "../collection/WordCollectionList";
import { useEffect } from "react";
import { fetchTickets } from "../collection/functions/fetchTickets";
import SearchBarContainer from "../collection/SearchBarContainer";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionState } from "../store/collection";
import { fetchTicketsFirstBatch } from "../collection/functions/fetchTicketsFirstBatch";
import BusyWrapper from "../ui/Loader/BusyWrapper";
import { getAuthState } from "../store/auth";

const Collection = ({ navigation }) => {
  const dispatch = useDispatch();
  const { searchKeyword, tickets, page, busy } =
    useSelector(getCollectionState);
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

  return (
    <InnerTabContainer heading="Collection">
      <SearchBarContainer navigation={navigation} />
      <BusyWrapper {...{ busy, size: 96 }}>
        <WordCollectionList
          navigation={navigation}
          tickets={tickets}
        />
      </BusyWrapper>
    </InnerTabContainer>
  );
};

export default Collection;
