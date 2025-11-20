import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import PopUpContainer from "@src/components/containers/PopUpsContainer";
import { FlatList, StyleSheet, View } from "react-native";
import DictionarySelectorMenuItem from "./DictionarySelectorMenuItem";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import { useState } from "react";
import AppText from "@src/components/AppText";
import ChangeHomeLanguageLabel from "./ChangeHomeLanguageLabel";
import { authState } from "@src/store/auth";
import useSetDictionaries from "../../../hooks/optionsHooks/useSetDictionaries";
import Dictionary from "../../../types/dictionaries";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const DictionarySelectionScreen = () => {
  const { appLang } = useSelector(settingsState);
  const { title, dictionaryError } =
    appTextSource(appLang).options.chooseDictionary;

  const { busy, justSignedUp } = useSelector(authState);

  const [dictionaries, setDictionaries] = useState<
    Dictionary[]
  >([]);

  useSetDictionaries(setDictionaries);

  return (
    <PopUpContainer heading={title}>
      <BusyWrapper busy={busy} size={150}>
        {dictionaries.length === 0 ? (
          <AppText
            style={{
              textAlign: "left",
              fontSize: 15,
              padding: base * 20,
            }}
          >
            {dictionaryError}
          </AppText>
        ) : (
          <>
            <FlatList
              data={dictionaries}
              renderItem={({ item }) => {
                // must be called item for FlatList to work
                return (
                  <DictionarySelectorMenuItem
                    key={`${item}:key`}
                    dictionary={item}
                  />
                );
              }}
              keyboardShouldPersistTaps="handled"
              style={styles.flatList}
              ListFooterComponent={
                <View style={{ height: 100 }} />
              }
            />
            {justSignedUp ? null : (
              <ChangeHomeLanguageLabel />
            )}
          </>
        )}
      </BusyWrapper>
    </PopUpContainer>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: "100%",
  },
});

export default DictionarySelectionScreen;
