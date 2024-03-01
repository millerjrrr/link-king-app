import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
} from "react-native";
import WordCard from "./WordCard";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollectionState,
  updateCollection,
} from "../store/collection";
import Loader from "../ui/Loaders/Loader";

const ListHeaderComponent = () => {
  return <View style={{ height: 80 }} />;
};
const ListFooterComponent = () => {
  const { allDataLoaded } = useSelector(getCollectionState);
  return !allDataLoaded ? <Loader /> : null;
};

const WordCollectionList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { tickets, page, allDataLoaded } = useSelector(
    getCollectionState,
  );

  return tickets === null || tickets.length === 0 ? (
    <View style={{ flex: 1, paddingTop: 90, width: "80%" }}>
      <Text
        style={{
          color: colors.RED,
          fontSize: 30,
          textAlign: "center",
        }}
      >
        No words containing these letters
      </Text>
    </View>
  ) : (
    <FlatList
      data={tickets}
      renderItem={({ item }) => {
        return (
          <View>
            <WordCard
              navigation={navigation}
              ticket={item}
            />
          </View>
        );
      }}
      keyExtractor={(item) => item._id}
      style={styles.flatList}
      ListHeaderComponent={ListHeaderComponent}
      onEndReached={() => {
        if (!allDataLoaded)
          dispatch(updateCollection({ page: page + 1 }));
      }}
      onEndReachedThreshold={0.1}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: "100%",
  },
});

export default WordCollectionList;
