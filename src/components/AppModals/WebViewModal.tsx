import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import { WebViewContainer } from "./StyledCompontents";
import { modalState } from "@src/store/modals";
import AppModal from "./AppModal";
import useColors from "@src/hooks/useColors";

const WebViewModal = () => {
  const { webViewUrl } = useSelector(modalState);

  return (
    <AppModal name="webViewModal">
      <WebViewContainer>
        <WebView
          style={{
            flex: 1,
            borderRadius: 10,
            backgroundColor: "black",
          }}
          source={{
            uri: webViewUrl,
          }}
        />
      </WebViewContainer>
    </AppModal>
  );
};

export default WebViewModal;
