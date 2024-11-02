import { useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { getConsoleState } from "@src/store/console";
import languageNameCodeMap from "@src/utils/languageNameCodeMap";
import PopUpContainer from "@src/components/containers/PopUpContainer";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import DictionarySelectorMenuItem from "./DictionarySelectorMenuItem";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import { useEffect, useState } from "react";
import getAvailableDictionaries from "./getAvailableDictionaries";
import AppText from "@src/components/AppText";
import ChangeHomeLanguageLabel from "./ChangeHomeLanguageLabel";

const DictionarySelectionScreen = ({ navigation }) => {
  const { appLang } = useSelector(getSettingsState);
  const { title: heading, dictionaryError } =
    appTextSource(appLang).options.chooseDictionary;

  const { busy } = useSelector(getConsoleState);

  const [apiBusy, setApiBusy] = useState(false);
  const [dictionaries, setDictionaries] = useState([]);

  useEffect(() => {
    const fetchDictionaries = async () => {
      setApiBusy(true);
      await getAvailableDictionaries({
        appLang,
        setDictionaries,
      });
      setApiBusy(false);
    };

    fetchDictionaries();
  }, [navigation]);

  return (
    <PopUpContainer {...{ heading }}>
      <BusyWrapper {...{ busy: apiBusy }}>
        {dictionaries.length === 0 ? (
          <AppText
            {...{
              style: {
                textAlign: "left",
                fontSize: 15,
                padding: 20,
              },
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
                    {...{
                      name: item,
                      busy,
                    }}
                  />
                );
              }}
              style={styles.flatList}
              ListFooterComponent={
                <View style={{ height: 100 }} />
              }
            />
            <ChangeHomeLanguageLabel />
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
