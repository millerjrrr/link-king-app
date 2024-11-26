import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import { WebView } from "react-native-webview";
import {
  WebViewContainer,
  XBarContainer,
} from "./StyledCompontents";
import { AntDesign } from "@expo/vector-icons";
import { modalState } from "@src/store/modals";

const DefinitionInWebViewModal = ({ x }) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  const { definitionSearchWord, definitionSearchLanguage } =
    useSelector(modalState);

  const injectedCSS = `
    body {
      background-color: #121212 !important;
      color: #ffffff !important;
    }
    a {
      color: #1e90ff !important;
    }
    input, textarea {
      background-color: #333333 !important;
      color: #ffffff !important;
    }
    header, footer {
      background-color: #121212 !important;
    }
  `;

  const injectedJavaScript = `
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = \`${injectedCSS}\`;
    document.head.appendChild(style);
    true; // Signal that the script ran successfully
  `;

  return (
    <WebViewContainer>
      <XBarContainer onPress={x}>
        <AntDesign name="close" size={24} color={color} />
      </XBarContainer>
      <WebView
        style={{ flex: 1, borderRadius: 10 }}
        source={{
          uri: `https://www.google.com/search?q=define+${definitionSearchWord}&hl=${definitionSearchLanguage}&theme=dark`,
        }}
        injectedJavaScript={injectedJavaScript}
      />
    </WebViewContainer>
  );
};

export default DefinitionInWebViewModal;
