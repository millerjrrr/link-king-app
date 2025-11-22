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
import CreateCustomTicket from "./CreateCustomTicket";
import { collectionState } from "@src/store/collection";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const DictionaryListFooter: React.FC<{
  searchKeyword: string;
}> = ({ searchKeyword }) => {
  const { allDataLoaded } = useSelector(
    dictionaryLookupState
  );
  return (
    <>
      {!allDataLoaded ? (
        <View style={{ height: base * 100 }}>
          <Loader {...{ size: base * 50 }} />
        </View>
      ) : (
        <CreateCustomTicket searchKeyword={searchKeyword} />
      )}
      <View style={{ height: base * 100 }} />
    </>
  );
};

const DictionaryLookupList = () => {
  const dispatch = useDispatch();
  const { dictEntries, page, allDataLoaded } = useSelector(
    dictionaryLookupState
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
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1, width: "85%" }}
    >
      <View style={{ height: base * 90 }} />
      {searchKeyword !== "" ? (
        <>
          <CreateCustomTicket
            searchKeyword={searchKeyword}
          />
          <View style={{ height: base * 20 }} />
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
      keyboardShouldPersistTaps="handled"
      style={styles.flatList}
      onEndReached={() => {
        if (!allDataLoaded) dispatch(updatePage(page + 1));
      }}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        <DictionaryListFooter
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
    paddingTop: base * 90,
    width: "100%",
  },
});

export default DictionaryLookupList;
