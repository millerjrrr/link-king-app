import { Text, Linking, View } from "react-native";
import AppText from "@src/components/AppText";
import colors from "@src/utils/colors";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { updateModals } from "@src/store/modals";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const Container = styled(View)`
  width: 100%;
  padding-vertical: ${base * 10}px;
`;

const TextComponent = styled(AppText)<{ color: string }>`
  font-size: ${base * 15}px;
  color: ${(props) => props.color};
`;

const Link = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  text-decoration-line: underline;
`;

const TermsAndConditions = () => {
  const { colorScheme, appLang } =
    useSelector(settingsState);
  const { CONTRAST, INACTIVE_CONTRAST } =
    colors[colorScheme];

  const { terms } = appTextSource(appLang).paywall;
  const dispatch = useDispatch();

  return (
    <Container>
      <TextComponent
        {...{
          color: CONTRAST[1],
        }}
      >
        {terms[0]}
        <Link
          color={INACTIVE_CONTRAST}
          onPress={() =>
            dispatch(
              updateModals({
                modalShowing: "webViewModal",
                webViewUrl:
                  "https://millerjrrr.github.io/jacobs-apps/link-king-com/terms-conditions/index.html",
              })
            )
          }
        >
          {terms[1]}
        </Link>
        {terms[2]}
        <Link
          color={INACTIVE_CONTRAST}
          onPress={() =>
            dispatch(
              updateModals({
                modalShowing: "webViewModal",
                webViewUrl:
                  "https://link-king.com/privacy-policy/",
              })
            )
          }
        >
          {terms[3]}
        </Link>
      </TextComponent>
    </Container>
  );
};

export default TermsAndConditions;
