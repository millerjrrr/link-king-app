import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import LanguageCard from "./LanguageCard";

const LanguageList = ({ languages }) => {
  return languages === null ||
    languages.length === 0 ? null : (
    <>
      <FlatList
        data={languages}
        renderItem={({ item }) => {
          // must be called item for FlatList to work
          const { code, name, native } = item;
          return (
            <LanguageCard {...{ code, name, native }} />
          );
        }}
        keyExtractor={(item) => item.code}
        style={styles.flatList}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={{ height: 100 }} />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingTop: 90,
    width: "100%",
  },
});

export default LanguageList;
