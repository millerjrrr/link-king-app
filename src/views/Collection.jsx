import { View, StyleSheet } from "react-native";
import InnerTabBackground from "../components/InnerTabBackground";
import WordCollectionList from "../collection/WordCollectionList";
import { useEffect } from "react";
import { fetchTickets } from "../collection/functions/fetchTickets";
import SearchBar from "../collection/SearchBar";
import BusyWrapper from "../components/BusyWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollectionState,
  updateCollection,
} from "../store/collection";
import { fetchTicketsFirstBatch } from "../collection/functions/fetchTicketsFirstBatch";

const Collection = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    searchKeyword,
    tickets,
    page,
    reload,
    busy,
    connected,
  } = useSelector(getCollectionState);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        fetchTicketsFirstBatch(dispatch, []);
      },
    );
    return unsubscribe;
  }, [navigation, connected]);

  useEffect(() => {
    if (page > 1)
      fetchTickets(dispatch, searchKeyword, tickets, page);
  }, [page]);

  useEffect(() => {
    fetchTicketsFirstBatch(dispatch, searchKeyword);
  }, [searchKeyword]);

  return (
    <InnerTabBackground heading="Collection">
      <View style={styles.container}>
        <SearchBar navigation={navigation} />
        <BusyWrapper
          busy={busy}
          connected={connected}
          refresh={() =>
            dispatch(updateCollection({ reload: !reload }))
          }
          style={styles.container}
        >
          <WordCollectionList
            navigation={navigation}
            tickets={tickets}
          />
        </BusyWrapper>
      </View>
    </InnerTabBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Collection;
