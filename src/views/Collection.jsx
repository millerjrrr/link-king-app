import { View, StyleSheet } from "react-native";
import InnerTabBackground from "../components/InnerTabBackground";
import WordCollectionList from "../collection/WordCollectionList";
import { useEffect, useState } from "react";
import { fetchTickets } from "../collection/functions/fetchTickets";
import SearchBar from "../collection/SearchBar";
import BusyWrapper from "../components/BusyWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollectionState,
  updateCollection,
} from "../store/collection";
import { normalize } from "../console/functions/normalize";

const Collection = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    busy,
    connected,
    page,
    tickets,
    searchKeyword,
    filteredTickets,
  } = useSelector(getCollectionState);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        fetchTickets(dispatch);
      },
    );
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchTickets(dispatch);
  }, [page]);

  const filterFunction = () => {
    if (tickets) {
      const filtered = tickets.filter((ticket) => {
        return normalize(ticket.dicEntry.target).includes(
          normalize(searchKeyword),
        );
      });
      dispatch(
        updateCollection({
          filteredTickets: filtered,
        }),
      );
    }
  };

  useEffect(() => {
    filterFunction();
  }, [searchKeyword]);

  return (
    <InnerTabBackground heading="Collection">
      <View style={styles.container}>
        <SearchBar />
        <BusyWrapper
          busy={busy}
          connected={connected}
          refresh={() =>
            dispatch(updateCollection({ page: !page }))
          }
          style={styles.container}
        >
          <WordCollectionList
            navigation={navigation}
            tickets={filteredTickets}
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
