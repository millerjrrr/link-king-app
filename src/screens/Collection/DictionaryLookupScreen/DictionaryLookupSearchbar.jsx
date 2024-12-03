import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppSearchBar from "@src/components/AppSearchBar";
import {
  dictionaryLookupState,
  updateSearchKeyword,
} from "@src/store/dictionaryLookup";
import styled from "styled-components/native";
import { View } from "react-native";
import FadeBackgroundView from "@src/components/Graphics/FadeBackgroundView";

const Container = styled(View)`
  width: 100%;
  align-items: center;
  height: 10px;
  align-items: center;
  z-index: 20;
`;

const DictionaryLookupSearchbar = () => {
  const { appLang } = useSelector(settingsState);
  const { searchKeyword } = useSelector(
    dictionaryLookupState,
  );
  const { searchMessage } =
    appTextSource(appLang).collection
      .dictionaryLookupScreen;
  const dispatch = useDispatch();

  return (
    <Container>
      <FadeBackgroundView style={{ paddingBottom: 10 }}>
        <AppSearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={(value) =>
            dispatch(updateSearchKeyword(value))
          }
          placeholder={searchMessage}
        />
      </FadeBackgroundView>
    </Container>
  );
};

export default DictionaryLookupSearchbar;
