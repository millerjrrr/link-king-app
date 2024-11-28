import TabScreenContainer from "@src/components/Containers/TabScreenContainer";
import WordCollectionList from "./components/WordCollectionList";
import SearchBarContainer from "./components/SearchBarContainer";
import { useDispatch, useSelector } from "react-redux";
import { collectionState } from "@src/store/collection";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import appTextSource from "@src/utils/appTextSource";
import { settingsState } from "@src/store/settings";
import useFetchTickets from "@src/hooks/collectionHooks/useFetchTickets";
import { updateModals } from "@src/store/modals";
import usePopToTop from "@src/hooks/usePopToTop";

const Collection = ({ navigation }) => {
  usePopToTop();
  const { tickets, busy } = useSelector(collectionState);
  const { appLang } = useSelector(settingsState);
  const { heading } = appTextSource(appLang).collection;

  useFetchTickets();
  const dispatch = useDispatch();

  const help = () => {
    dispatch(
      updateModals({ modalShowing: "collectionInfoModal" }),
    );
  };

  const dictionarySettings = () => {
    navigation.navigate("Options");
    navigation.navigate("DictionarySelectionScreen");
  };

  return (
    <TabScreenContainer
      heading={heading}
      help={help}
      dictionarySettings={dictionarySettings}
    >
      <SearchBarContainer navigation={navigation} />
      <BusyWrapper busy={busy} size={96} pushToTop={true}>
        <WordCollectionList
          navigation={navigation}
          tickets={tickets}
        />
      </BusyWrapper>
    </TabScreenContainer>
  );
};

export default Collection;
