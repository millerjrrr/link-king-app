import { View, StyleSheet } from "react-native";
import InnerTabBackground from "../components/InnerTabBackground";
import WordCollectionList from "../collection/WordCollectionList";
import { useEffect, useState } from "react";
import { fetchTickets } from "../collection/functions/fetchTickets";
import SearchBar from "../collection/SearchBar";
import DataAndTitle from "../collection/DataAndTitle";

const Collection = ({ navigation }) => {
  const [tickets, setTickets] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredTickets, setFilteredTickets] =
    useState(tickets);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    fetchTickets(setTickets, setFilteredTickets, setBusy);
  }, []);

  const filterFunction = () => {
    if (tickets) {
      const filtered = tickets.filter((ticket) => {
        return ticket.dicEntry.target
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());
      });
      console.log(searchKeyword);
      console.log(filtered[0]);
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
        <WordCollectionList
          navigation={navigation}
          tickets={filteredTickets}
        />
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
