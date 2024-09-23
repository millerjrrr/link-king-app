import { Text, Linking, View } from "react-native";
import AppText from "../ui/AppText";
import colors from "../utils/colors";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import appTextSource from "../utils/appTextSource";

const Container = styled(View)`
  width: 100%;
  padding-vertical: 10px;
`;

const TextComponent = styled(AppText)`
  font-size: 15px;
  color: ${(props) => props.color};
`;

const Link = styled(Text)`
  color: ${(props) => props.color};
  text-decoration-line: underline;
`;

const TermsAndConditions = () => {
  const { colorScheme, appLang } = useSelector(
    getSettingsState,
  );
  const { CONTRAST, INACTIVE_CONTRAST } =
    colors[colorScheme];

  const { terms } = appTextSource(appLang).paywall;

  return (
    <Container>
      <TextComponent
        {...{
          color: CONTRAST[1],
        }}
      >
        {terms[0]}
        <Link
          {...{
            color: INACTIVE_CONTRAST,
            onPress: () =>
              Linking.openURL(
                "https://www.linkoking.com/terms-of-service",
              ),
          }}
        >
          {terms[1]}
        </Link>
        {terms[2]}
        <Link
          {...{
            color: INACTIVE_CONTRAST,
            onPress: () =>
              Linking.openURL(
                "https://www.linkoking.com/privacy-policy",
              ),
          }}
        >
          {terms[3]}
        </Link>
      </TextComponent>
    </Container>
  );
};

export default TermsAndConditions;
