import PopUpContainer from "@src/components/Containers/PopUpContainer";
import DictionaryLookupList from "./DictionaryLookupList";
import DictionaryLookupSearchbar from "./DictionaryLookupSearchbar";
import useFetchDictEntries from "@src/hooks/collectionHooks/useFetchDictEntries";
import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";

import BusyWrapper from "@src/components/Loader/BusyWrapper";
import { dictionaryLookupState } from "@src/store/dictionaryLookup";
import NewWordAddedModal from "@src/components/AppModals/NewWordAddedModal";

const DictionaryLookupScreen = () => {
  useFetchDictEntries();

  const { appLang } = useSelector(settingsState);
  const { heading } =
    appTextSource(appLang).collection
      .dictionaryLookupScreen;

  const { busy } = useSelector(dictionaryLookupState);

  return (
    <PopUpContainer heading={heading}>
      <DictionaryLookupSearchbar />
      <BusyWrapper busy={busy} size={100}>
        <DictionaryLookupList />
      </BusyWrapper>
      <NewWordAddedModal />
    </PopUpContainer>
  );
};

export default DictionaryLookupScreen;
