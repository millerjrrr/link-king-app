import { StyleSheet } from "react-native";
import PopUpContainer from "../components/containers/PopUpContainer";
import BusyWrapper from "../ui/Loader/BusyWrapper";
import { useSelector, useDispatch } from "react-redux";
import { getSettingsState } from "../store/settings";
import appTextSource from "../utils/appTextSource";
import OptionsMenuItem from "./OptionsMenuItem";
import { getConsoleState } from "../store/console";
import { sendDictionary } from "./components/sendDictionary";

const DictionarySelectionScreen = (props) => {
  const { appLang } = useSelector(getSettingsState);
  const {
    title: heading,
    titleA,
    titleB,
  } = appTextSource[appLang].options.chooseDictionary;

  const { dictionary, busy } = useSelector(getConsoleState);

  const dispatch = useDispatch();

  const setDictionaryToBrazil = () => {
    sendDictionary({ dictionary: "Brazil", dispatch });
  };

  const setDictionaryToSpanish = () => {
    sendDictionary({ dictionary: "Personal", dispatch });
  };

  return (
    <PopUpContainer {...{ heading }}>
      <BusyWrapper {...{ busy }}>
        <OptionsMenuItem
          {...{
            iconName: "Brazil",
            name: titleA,
            onPress: setDictionaryToBrazil,
            selected: dictionary === "Brazil",
            first: true,
          }}
        />
        <OptionsMenuItem
          {...{
            iconName: "Spanish",
            name: titleB,
            onPress: setDictionaryToSpanish,
            selected: dictionary !== "Brazil",
            first: true,
          }}
        />
      </BusyWrapper>
    </PopUpContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DictionarySelectionScreen;
