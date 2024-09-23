import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import { getConsoleState } from "../../store/console";
import languageNameCodeMap from "../../utils/languageNameCodeMap";
import PopUpContainer from "../../components/containers/PopUpContainer";
import { FlatList, StyleSheet, View } from "react-native";
import DictionarySelectorMenuItem from "./DictionarySelectorMenuItem";
import BusyWrapper from "../../ui/Loader/BusyWrapper";
import { useEffect, useState } from "react";
import getAvailableDictionaries from "./getAvailableDictionaries";

const DictionarySelectionScreen = ({ navigation }) => {
  const { appLang } = useSelector(getSettingsState);
  const { title: heading } =
    appTextSource(appLang).options.chooseDictionary;

  const { busy } = useSelector(getConsoleState);

  const [apiBusy, setApiBusy] = useState(false);
  const [dictionaries, setDictionaries] = useState([
    "English",
    "Portuguese",
    "Spanish",
  ]);

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
        <FlatList
          data={dictionaries}
          renderItem={({ item }) => {
            // must be called item for FlatList to work
            return (
              <DictionarySelectorMenuItem
                {...{ name: item, busy }}
              />
            );
          }}
          keyExtractor={(item) => item.name}
          style={styles.flatList}
          ListFooterComponent={
            <View style={{ height: 100 }} />
          }
        />
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
