import { useDispatch, useSelector } from "react-redux";
import {
  collectionState,
  updateSearchKeyword,
} from "@src/store/collection";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppSearchBar from "@src/components/AppSearchBar";

const CollectionSearchbar = () => {
  const { appLang } = useSelector(settingsState);
  const { searchKeyword } = useSelector(collectionState);
  const dispatch = useDispatch();

  const { searchMessage } =
    appTextSource(appLang).collection;

  return (
    <AppSearchBar
      searchKeyword={searchKeyword}
      setSearchKeyword={(value) =>
        dispatch(updateSearchKeyword(value))
      }
      placeholder={searchMessage}
    />
  );
};

export default CollectionSearchbar;
