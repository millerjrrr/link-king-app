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

  return (
    <WebViewContainer>
      <XBarContainer onPress={x}>
        <AntDesign name="close" size={24} color={color} />
      </XBarContainer>
      <WebView
        style={{ flex: 1, borderRadius: 10 }}
        source={{
          uri: `https://www.google.com/search?q=define+${definitionSearchWord}&hl=${definitionSearchLanguage}`,
        }}
      />
    </WebViewContainer>
  );
};

export default DefinitionInWebViewModal;
