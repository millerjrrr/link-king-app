import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppSearchBar from "@src/components/AppSearchBar";
import styled from "styled-components/native";
import { View } from "react-native";
import FadeBackgroundView from "@src/components/Graphics/FadeBackgroundView";
import {
  collectionState,
  updateSearchKeyword,
} from "@src/store/collection";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const Container = styled(View)`
  width: 100%;
  align-items: center;
  height: ${base * 10}px;
  align-items: center;
  z-index: 20;
`;

const DictionaryLookupSearchbar = () => {
  const { appLang } = useSelector(settingsState);
  const { searchKeyword } = useSelector(collectionState);
  const { searchMessage } =
    appTextSource(appLang).collection
      .dictionaryLookupScreen;
  const dispatch = useDispatch();

  return (
    <Container>
      <FadeBackgroundView style={{ paddingBottom: 10 }}>
        <AppSearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={(value: string) =>
            dispatch(updateSearchKeyword(value))
          }
          placeholder={searchMessage}
        />
      </FadeBackgroundView>
    </Container>
  );
};

export default DictionaryLookupSearchbar;
