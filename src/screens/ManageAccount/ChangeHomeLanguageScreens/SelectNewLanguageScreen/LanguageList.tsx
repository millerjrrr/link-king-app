import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import LanguageCard from "./LanguageCard";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

export interface Language {
  code: string;
  name: string;
  native: string;
}

interface LanguageListProps {
  languages: Language[];
  unprotect: boolean;
}
const LanguageList: React.FC<LanguageListProps> = ({
  languages,
  unprotect,
}) => {
  return languages === null ||
    languages.length === 0 ? null : (
    <>
      <FlatList
        data={languages}
        renderItem={({ item }) => {
          // must be called item for FlatList to work
          const { code, name, native } = item;
          const shortcode = code.slice(0, 2);
          return (
            <LanguageCard
              {...{
                code: shortcode,
                name,
                native,
                unprotect,
              }}
            />
          );
        }}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item) => item.code}
        style={styles.flatList}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={{ height: base * 100 }} />
        }
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingTop: base * 90,
    width: "100%",
  },
});

export default LanguageList;
