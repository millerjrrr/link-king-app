import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
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

const ListFooterComponent = () => {
  const { allDataLoaded } = useSelector(
    dictionaryLookupState,
  );
  return (
    <>
      {!allDataLoaded ? (
        <View style={{ height: 100 }}>
          <Loader {...{ size: 50 }} />
        </View>
      ) : null}
      <View style={{ height: 100 }} />
    </>
  );
};

const DictionaryLookupList = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    dictEntries,
    page,
    allDataLoaded,
    searchKeyword,
  } = useSelector(dictionaryLookupState);
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
    <ScrollView
      style={{ flex: 1, paddingTop: 90, width: "80%" }}
    >
      <AppText>{noWords}</AppText>
    </ScrollView>
  ) : (
    <FlatList
      data={dictEntries}
      renderItem={({ item }) => {
        // must be called item for FlatList to work
        return <DictionaryLookupCard dictEntry={item} />;
      }}
      keyExtractor={(item, _index) => _index}
      style={styles.flatList}
      onEndReached={() => {
        if (!allDataLoaded) dispatch(updatePage(page + 1));
      }}
      onEndReachedThreshold={0.1}
      ListFooterComponent={ListFooterComponent}
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
