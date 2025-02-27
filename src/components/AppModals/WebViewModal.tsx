import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import { WebViewContainer } from "./components/StyledCompontents";
import { modalState } from "@src/store/modals";
import AppModal from "./AppModal";

const WebViewModal = () => {
  const { webViewUrl } = useSelector(modalState);

  return (
    <AppModal name="webViewModal" webViewUrl={webViewUrl}>
      <WebViewContainer>
        <WebView
          style={{
            flex: 1,
            borderRadius: 10,
            backgroundColor: "black",
          }}
          allowsInlineMediaPlayback={true} // iOS: Allows inline playback instead of full screen
          source={{
            uri: webViewUrl,
          }}
        />
      </WebViewContainer>
    </AppModal>
  );
};

export default WebViewModal;
