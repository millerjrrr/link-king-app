import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppSearchBar from "@src/components/AppSearchBar";
import {
  dictionaryLookupState,
  updateSearchKeyword,
} from "@src/store/dictionaryLookup";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";
import { View } from "react-native";
import colors from "@src/utils/colors";

const Container = styled(View)`
  width: 100%;
  align-items: center;
  height: 10px;
  align-items: center;
  z-index: 20;
`;
const FadeBackgroundView = styled(LinearGradient)`
  position: absolute;
  align-items: center;
  padding-bottom: 10px;
  width: 100%;
  z-index: 20;
`;

const DictionaryLookupSearchbar = () => {
  const { appLang, colorScheme } =
    useSelector(settingsState);
  const backgroundColor = colors[colorScheme].PRIMARY;
  const { searchKeyword } = useSelector(
    dictionaryLookupState,
  );
  const { searchMessage } =
    appTextSource(appLang).collection
      .dictionaryLookupScreen;
  const dispatch = useDispatch();

  return (
    <Container>
      <FadeBackgroundView
        colors={[
          backgroundColor,
          backgroundColor + "E6",
          backgroundColor + "80",
          backgroundColor + "00",
        ]}
      >
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
