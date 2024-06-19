import PopUpContainer from "../components/containers/PopUpContainer";
import BusyWrapper from "../ui/Loader/BusyWrapper";
import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import appTextSource from "../utils/appTextSource";
import { getConsoleState } from "../store/console";
import DictionarySelectorMenuItem from "./components/DictionarySelectorMenuItem";
import { View } from "react-native";
import AppText from "../ui/AppText";

const DictionarySelectionScreen = () => {
  const { appLang } = useSelector(getSettingsState);
  const {
    title: heading,
    textA,
    textB,
  } = appTextSource[appLang].options.chooseDictionary;

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
          <AppText
            {...{
              style: {
                fontSize: 20,
                padding: 15,
                textAlign: "left",
                width: "100%",
              },
            }}
          >
            {textA}
          </AppText>
          <DictionarySelectorMenuItem
            {...{ name: "English-Portuguese", busy }}
          />
          <DictionarySelectorMenuItem
            {...{ name: "Spanish-English", busy }}
          />
          <AppText
            {...{
              style: {
                fontSize: 20,
                padding: 15,
                textAlign: "left",
              },
            }}
          >
            {textB}
          </AppText>
        </>
      )}
    </PopUpContainer>
  );
};

export default DictionarySelectionScreen;
