import PopUpContainer from "@src/components/Containers/PopUpContainer";
import DictionaryLookupList from "./DictionaryLookupList";
import DictionaryLookupSearchbar from "./DictionaryLookupSearchbar";
import useFetchDictEntries from "@src/hooks/collectionHooks/useFetchDictEntries";
import appTextSource from "@src/utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppModal from "@src/components/AppModals";
import {
  modalState,
  updateModals,
} from "@src/store/modals";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import { dictionaryLookupState } from "@src/store/dictionaryLookup";

const DictionaryLookupScreen = () => {
  useFetchDictEntries();

  const { appLang } = useSelector(settingsState);
  const { heading } =
    appTextSource(appLang).collection
      .dictionaryLookupScreen;

  const { showNewWordAddedModal } = useSelector(modalState);
  const { busy } = useSelector(dictionaryLookupState);

  const dispatch = useDispatch();

  return (
    <PopUpContainer heading={heading} blockPopToTop={true}>
      <DictionaryLookupSearchbar />
      <BusyWrapper busy={busy}>
        <DictionaryLookupList />
      </BusyWrapper>
      <AppModal
        {...{
          isVisible: showNewWordAddedModal,
          onBackdropPress: () => {
            dispatch(
              updateModals({
                showNewWordAddedModal: false,
              }),
            );
          },
          newWordAdded: true,
          info: true,
        }}
      />
    </PopUpContainer>
  );
};

export default DictionaryLookupScreen;
