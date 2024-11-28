import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import { WebViewContainer } from "./StyledCompontents";
import { modalState } from "@src/store/modals";
import AppModal from "./AppModal";

const DefinitionInWebViewModal = () => {
  const { definitionSearchWord, definitionSearchLanguage } =
    useSelector(modalState);

  return (
    <AppModal name="definitionInWebViewModal">
      <WebViewContainer>
        <WebView
          style={{ flex: 1, borderRadius: 10 }}
          source={{
            uri: `https://www.google.com/search?q=define+${definitionSearchWord}&hl=${definitionSearchLanguage}&theme=dark`,
          }}
        />
      </WebViewContainer>
    </AppModal>
  );
};

export default DefinitionInWebViewModal;
