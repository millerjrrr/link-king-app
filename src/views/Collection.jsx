import { View, StyleSheet } from "react-native";
import InnerTabBackground from "../components/InnerTabBackground";
import WordCollectionList from "../collection/WordCollectionList";
import { useEffect, useState } from "react";
import { fetchTickets } from "../collection/functions/fetchTickets";
import SearchBar from "../collection/SearchBar";
import BusyWrapper from "../components/BusyWrapper";

const Collection = ({ navigation }) => {
  // ...loader management...
  const [busy, setBusy] = useState(true);
  const [connected, setConnected] = useState(true);
  const [page, refresh] = useState(true);

  const [tickets, setTickets] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredTickets, setFilteredTickets] =
    useState(tickets);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        fetchTickets(
          setTickets,
          setFilteredTickets,
          setBusy,
          setConnected,
        );
      },
    );
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchTickets(
      setTickets,
      setFilteredTickets,
      setBusy,
      setConnected,
    );
  }, [page]);

  const filterFunction = () => {
    if (tickets) {
      const filtered = tickets.filter((ticket) => {
        return ticket.dicEntry.target
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());
      });
      setFilteredTickets(filtered);
    }
  };

  useEffect(() => {
    filterFunction();
  }, [searchKeyword]);

  return (
    <InnerTabBackground heading="Collection">
      <View style={styles.container}>
        <SearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        <BusyWrapper
          busy={busy}
          connected={connected}
          refresh={() => refresh(!page)}
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
