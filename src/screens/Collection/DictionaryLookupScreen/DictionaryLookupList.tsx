import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@src/components/Loader";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";
import {
  dictionaryLookupState,
  updatePage,
} from "@src/store/dictionaryLookup";
import DictionaryLookupCard from "./DictionaryLookupCard";
import { ScrollView } from "react-native-gesture-handler";
import AddCustomDictionaryEntry from "./AddCustomDictionaryEntry";
import { collectionState } from "@src/store/collection";

const ListFooterComponent: React.FC<{
  searchKeyword: string;
}> = ({ searchKeyword }) => {
  const { allDataLoaded } = useSelector(
    dictionaryLookupState,
  );
  return (
    <>
      {!allDataLoaded ? (
        <View style={{ height: 100 }}>
          <Loader {...{ size: 50 }} />
        </View>
      ) : (
        <AddCustomDictionaryEntry
          searchKeyword={searchKeyword}
        />
      )}
      <View style={{ height: 100 }} />
    </>
  );
};

const DictionaryLookupList = () => {
  const dispatch = useDispatch();
  const { dictEntries, page, allDataLoaded } = useSelector(
    dictionaryLookupState,
  );
  const { searchKeyword } = useSelector(collectionState);
  const { appLang } = useSelector(settingsState);
  const { searchDictionary, noResults, reminder } =
    appTextSource(appLang).collection
      .dictionaryLookupScreen;
  const noWords =
    searchKeyword === ""
      ? searchDictionary + "\n\n" + reminder
      : noResults + "\n\n" + reminder;

  return dictEntries === null ||
    dictEntries.length === 0 ? (
    <ScrollView style={{ flex: 1, width: "85%" }}>
      <View style={{ height: 90 }} />
      {searchKeyword !== "" ? (
        <>
          <AddCustomDictionaryEntry
            searchKeyword={searchKeyword}
          />
          <View style={{ height: 20 }} />
        </>
      ) : null}
      <AppText>{noWords}</AppText>
    </ScrollView>
  ) : (
    <FlatList
      data={dictEntries}
      renderItem={({ item }) => {
        // must be called item for FlatList to work
        return <DictionaryLookupCard dictEntry={item} />;
      }}
      keyExtractor={(item) => item.id}
      style={styles.flatList}
      onEndReached={() => {
        if (!allDataLoaded) dispatch(updatePage(page + 1));
      }}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        <ListFooterComponent
          searchKeyword={searchKeyword}
        />
      }
      showsVerticalScrollIndicator={Platform.OS !== "web"}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingTop: 90,
    width: "100%",
  },
});

export default DictionaryLookupList;
