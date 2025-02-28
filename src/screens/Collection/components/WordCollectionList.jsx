import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import WordCard from "./WordCard";
import { useDispatch, useSelector } from "react-redux";
import {
  collectionState,
  updatePage,
} from "@src/store/collection";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";
import ListFooterComponent from "@src/components/ListFooterComponent";

const WordCollectionList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { tickets, page, allDataLoaded } =
    useSelector(collectionState);
  const { appLang } = useSelector(settingsState);

  const { noWords } = appTextSource(appLang).collection;

  return tickets === null || tickets.length === 0 ? (
    <View
      style={{ flex: 1, paddingTop: 150, width: "80%" }}
    >
      <AppText>{noWords}</AppText>
    </View>
  ) : (
    <>
      <FlatList
        data={[...tickets]}
        renderItem={({ item }) => {
          // must be called item for FlatList to work
          return (
            <WordCard {...{ navigation, ticket: item }} />
          );
        }}
        keyExtractor={(item) => item.id || "plusButton"}
        keyboardShouldPersistTaps="handled"
        style={styles.flatList}
        onEndReached={() => {
          if (!allDataLoaded)
            dispatch(updatePage(page + 1));
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          ListFooterComponent({ active: !allDataLoaded })
        }
        showsVerticalScrollIndicator={Platform.OS !== "web"}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingTop: 150,
    width: "100%",
  },
});

export default WordCollectionList;
