import PopUpContainer from "../components/containers/PopUpContainer";
import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import appTextSource from "../utils/appTextSource";
import { getConsoleState } from "../store/console";
import DictionarySelectorMenuItem from "./components/DictionarySelectorMenuItem";
import { View } from "react-native";

const DictionarySelectionScreen = () => {
  const { appLang } = useSelector(getSettingsState);
  const { title: heading } =
    appTextSource[appLang].options.chooseDictionary;

  const { dictionary, busy } = useSelector(getConsoleState);

  const customDictionary =
    dictionary === "Personal" || dictionary === "Maciej";

  return (
    <PopUpContainer {...{ heading }}>
      {customDictionary ? (
        <>
          <View style={{ height: 30 }} />
          <DictionarySelectorMenuItem name="Custom-Dictionary" />
        </>
      ) : (
        <>
          <View style={{ height: 15 }} />
          <DictionarySelectorMenuItem
            {...{ name: "English-Portuguese", busy }}
          />
          <DictionarySelectorMenuItem
            {...{ name: "Spanish-English", busy }}
          />
        </>
      )}
    </PopUpContainer>
  );
};

export default DictionarySelectionScreen;
