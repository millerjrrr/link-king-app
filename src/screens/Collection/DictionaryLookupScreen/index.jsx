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

const DictionaryLookupScreen = () => {
  useFetchDictEntries();

  const { appLang } = useSelector(settingsState);
  const { heading } =
    appTextSource(appLang).collection
      .dictionaryLookupScreen;

  const { showNewWordAddedModal } = useSelector(modalState);

  const dispatch = useDispatch();

  return (
    <PopUpContainer heading={heading}>
      <DictionaryLookupSearchbar />
      <DictionaryLookupList />
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
