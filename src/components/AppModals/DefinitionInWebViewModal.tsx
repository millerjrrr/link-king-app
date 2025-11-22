import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import { WebViewContainer } from "./components/StyledCompontents";
import { modalState } from "@src/store/modals";
import AppModal from "./AppModal";
import useColors from "@src/hooks/utilityHooks/useColors";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const DefinitionInWebViewModal = () => {
  const { definitionSearchWord, definitionSearchLanguage } =
    useSelector(modalState);

  const { SECONDARY } = useColors();

  return (
    <AppModal name="definitionInWebViewModal">
      <WebViewContainer>
        <WebView
          style={{
            flex: 1,
            borderRadius: base * 10,
            backgroundColor: SECONDARY,
          }}
          source={{
            uri: `https://www.google.com/search?q=define+${definitionSearchWord}&hl=${definitionSearchLanguage}&theme=dark`,
          }}
        />
      </WebViewContainer>
    </AppModal>
  );
};

export default DefinitionInWebViewModal;
