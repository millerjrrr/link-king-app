import PopUpContainer from "../components/containers/PopUpContainer";
import BusyWrapper from "../ui/Loader/BusyWrapper";
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
        <BusyWrapper {...{ busy }}>
          <View style={{ height: 30 }} />
          <DictionarySelectorMenuItem name="English-Portuguese" />
          <DictionarySelectorMenuItem name="Spanish-English" />
        </BusyWrapper>
      )}
    </PopUpContainer>
  );
};

export default DictionarySelectionScreen;
