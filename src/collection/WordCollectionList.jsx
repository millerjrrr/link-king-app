import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
} from "react-native";
import WordCard from "./WordCard";
import colors from "../utils/colors";

const ListHeaderComponent = () => {
  return <View style={{ height: 70 }} />;
};

const WordCollectionList = ({ tickets, navigation }) => {
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
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: "100%",
    // paddingTop: 70,
  },
});

export default WordCollectionList;
