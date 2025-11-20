import PopUpContainer from "@src/components/containers/PopUpsContainer";
import DictionaryLookupList from "./DictionaryLookupList";
import DictionaryLookupSearchbar from "./DictionaryLookupSearchbar";
import useFetchDictEntries from "@src/hooks/collectionHooks/useFetchDictEntries";
import appTextSource from "@src/utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";

import BusyWrapper from "@src/components/Loader/BusyWrapper";
import { dictionaryLookupState } from "@src/store/dictionaryLookup";
import NewWordAddedModal from "@src/components/AppModals/NewWordAddedModal";
import { useNavigation } from "@react-navigation/native";
import { updateModals } from "@src/store/modals";

const DictionaryLookupScreen = () => {
  useFetchDictEntries();

  const { appLang } = useSelector(settingsState);
  const { heading } =
    appTextSource(appLang).collection
      .dictionaryLookupScreen;

  const { busy } = useSelector(dictionaryLookupState);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const backFunction = () => {
    dispatch(updateModals({ modalShowing: "" }));
    navigation.goBack();
  };

  return (
    <PopUpContainer
      heading={heading}
      altFunction={backFunction}
    >
      <DictionaryLookupSearchbar />
      <BusyWrapper busy={busy} size={150}>
        <DictionaryLookupList />
      </BusyWrapper>
    </PopUpContainer>
  );
};

export default DictionaryLookupScreen;
